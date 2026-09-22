/* =========================================================
   Jonuz Markaj — client behaviour
   The markup is rendered at build time; this only adds behaviour
   on top of it.
   ========================================================= */

import { sq, en, videos, film } from '../data/content.js';

const DICTS = { sq, en };

/* ---------- recordings: click-to-load ----------
   The stills are already in the page, so this only swaps one in for a
   player when it is clicked. Nothing loads from YouTube until then. */
function wirePlates() {
  for (const btn of document.querySelectorAll('.plate-frame')) {
    btn.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.video}?autoplay=1&rel=0`;
      frame.title = btn.dataset.work;
      frame.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
      frame.allowFullscreen = true;
      btn.replaceWith(frame);
    });
  }
}

/* ---------- language ---------- */
let current = 'sq';
try {
  current = localStorage.getItem('lang') === 'en' ? 'en' : 'sq';
} catch (e) { /* private mode */ }

function setLang(lang) {
  const dict = DICTS[lang] || sq;

  for (const el of document.querySelectorAll('[data-i18n]')) {
    const val = dict[el.dataset.i18n];
    if (val != null) el.innerHTML = val;
  }

  // Attributions on the recordings come from the video list, not the dictionary.
  for (const el of document.querySelectorAll('.by[data-by]')) {
    const v = videos[Number(el.dataset.by)];
    if (v) el.textContent = v.by[lang] || v.by.sq;
  }
  for (const btn of document.querySelectorAll('.plate-frame')) {
    btn.setAttribute('aria-label', `${lang === 'en' ? 'Play' : 'Luaj'} ${btn.dataset.work}`);
  }

  document.documentElement.lang = lang;
  document.getElementById('langToggle').textContent = lang === 'en' ? 'Shqip' : 'English';
  current = lang;

  try { localStorage.setItem('lang', lang); } catch (e) { /* private mode */ }
}

/* ---------- the film behind the opening ----------
   Autoplay is only permitted while muted, so it starts silent and the
   visitor turns the sound on. All of this is an enhancement: if it never
   starts, the still stays the ground and the page is intact. */
const opening = document.getElementById('top');
const soundBtn = document.getElementById('soundToggle');
const playBtn = document.getElementById('playToggle');
let player = null;

function filmAllowed() {
  // Plays at every screen size. Still skipped for visitors who asked for
  // reduced motion, or who are on save-data or a 2g connection — there the
  // still carries the section instead.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const conn = navigator.connection;
  if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return false;
  return true;
}

function startFilm() {
  if (player || !window.YT || !window.YT.Player) return;

  player = new window.YT.Player('filmPlayer', {
    videoId: film.id,
    playerVars: {
      autoplay: 1, mute: 1, controls: 0, loop: 1, playlist: film.id,
      start: film.start, playsinline: 1, modestbranding: 1,
      rel: 0, iv_load_policy: 3, disablekb: 1, fs: 0,
    },
    events: {
      onReady: (e) => {
        e.target.mute();
        e.target.playVideo();
        // Reveal on ready rather than on PLAYING: if a browser refuses the
        // autoplay, its first frame is the same image as the still, so the
        // section looks right either way.
        opening.classList.add('playing');
        // Shown as soon as the player exists, so that where autoplay was
        // refused (iOS low-power mode, strict autoplay settings) this button
        // is how the visitor starts it.
        soundBtn.hidden = false;
        playBtn.hidden = false;
      },
      onStateChange: (e) => {
        const S = window.YT.PlayerState;
        // The frame is only ever visible while the film is moving. The
        // moment it stops, YouTube paints its own controls across the
        // middle of the page, so we dissolve back to the still instead.
        const rolling = e.data === S.PLAYING || e.data === S.BUFFERING;
        opening.classList.toggle('rolling', rolling);
        setPlayLabel();
      },
    },
  });
}

/* Register the callback, then pull in the API. Doing it in this order
   means the API can never fire "ready" before we are listening for it —
   and if another copy of the API is already loaded, start straight away. */
function loadFilm() {
  if (!filmAllowed()) return;

  window.onYouTubeIframeAPIReady = startFilm;

  if (window.YT && window.YT.Player) {
    startFilm();
    return;
  }
  if (!document.querySelector('script[data-yt-api]')) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.dataset.ytApi = '';
    document.head.append(tag);
  }
}

soundBtn.addEventListener('click', () => {
  if (!player) return;
  const wasOn = soundBtn.getAttribute('aria-pressed') === 'true';

  if (wasOn) {
    player.mute();
    soundBtn.setAttribute('aria-pressed', 'false');
  } else {
    player.unMute();
    player.setVolume(60);
    // The click is a user gesture, so it also covers the case where the
    // browser refused to start the film on its own.
    if (player.getPlayerState && player.getPlayerState() !== window.YT.PlayerState.PLAYING) {
      player.playVideo();
    }
    soundBtn.setAttribute('aria-pressed', 'true');
  }

  const label = soundBtn.querySelector('.sound-label');
  const key = wasOn ? 'film.on' : 'film.off';
  label.dataset.i18n = key;
  label.textContent = DICTS[current][key];
});

/* Pause/play. WCAG 2.2.2: motion that starts on its own and runs past
   five seconds needs a way to stop it.

   `userPaused` is the visitor's own choice, and only the button sets it —
   the scroll observer below pauses too, but must never override a choice
   they made. The label is read off the player's real state rather than
   off either flag, so a refused autoplay shows "play", not "pause". */
let userPaused = false;

function isPlaying() {
  return !!player
    && typeof player.getPlayerState === 'function'
    && player.getPlayerState() === window.YT.PlayerState.PLAYING;
}

function setPlayLabel() {
  const playing = isPlaying();
  const key = playing ? 'film.pause' : 'film.play';
  const label = playBtn.querySelector('.sound-label');
  label.dataset.i18n = key;
  label.textContent = DICTS[current][key];
  playBtn.setAttribute('aria-pressed', String(playing));
  playBtn.querySelector('svg').innerHTML = playing
    ? '<rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/>'
    : '<path d="M4 2.5 13 8l-9 5.5V2.5Z"/>';
}

playBtn.addEventListener('click', () => {
  if (!player) return;
  if (isPlaying()) {
    userPaused = true;
    player.pauseVideo();
  } else {
    userPaused = false;
    player.playVideo();
  }
});

// Stop the film once it has scrolled out of sight.
if ('IntersectionObserver' in window) {
  new IntersectionObserver((entries) => {
    if (!player || typeof player.pauseVideo !== 'function') return;
    for (const entry of entries) {
      if (entry.isIntersecting && !userPaused) player.playVideo();
      else if (!entry.isIntersecting) player.pauseVideo();
    }
  }, { threshold: 0.2 }).observe(opening);
}

/* ---------- go ---------- */
wirePlates();
setLang(current);
document.getElementById('langToggle').addEventListener('click', () => {
  setLang(current === 'en' ? 'sq' : 'en');
});
loadFilm();

/* ---------- topbar ----------
   The bar sits transparent over the film and only grows a background
   once there is page behind it. */
const topbar = document.getElementById('topbar');
const menuBtn = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

if ('IntersectionObserver' in window) {
  // A one-pixel sentinel at the top beats a scroll listener: no work
  // happens on any frame except the two where the state actually flips.
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:64px;width:1px;pointer-events:none';
  opening.append(sentinel);
  new IntersectionObserver(
    ([e]) => topbar.classList.toggle('scrolled', !e.isIntersecting),
    { threshold: 0 },
  ).observe(sentinel);
}

function closeMenu() {
  menu.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
}

menuBtn.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') === 'true';
  if (open) closeMenu();
  else {
    menu.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
  }
});

// Any link closes it, and so does Escape — otherwise the panel stays open
// over the section it just jumped to.
menu.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuBtn.focus();
  }
});
// Leaving mobile width with the panel open would strand it on screen.
window.matchMedia('(min-width: 900px)').addEventListener('change', closeMenu);
