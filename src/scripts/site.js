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
let player = null;

function filmAllowed() {
  if (window.innerWidth < 720) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const conn = navigator.connection;
  if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return false;
  return true;
}

window.onYouTubeIframeAPIReady = () => {
  if (!filmAllowed() || !window.YT) return;

  player = new window.YT.Player('filmPlayer', {
    videoId: film.id,
    playerVars: {
      autoplay: 1, mute: 1, controls: 0, loop: 1, playlist: film.id,
      start: film.start, playsinline: 1, modestbranding: 1,
      rel: 0, iv_load_policy: 3, disablekb: 1, fs: 0,
    },
    events: {
      onReady: (e) => { e.target.mute(); e.target.playVideo(); },
      onStateChange: (e) => {
        if (e.data === window.YT.PlayerState.PLAYING) {
          opening.classList.add('playing');
          soundBtn.hidden = false;
        }
      },
    },
  });
};

soundBtn.addEventListener('click', () => {
  if (!player) return;
  const wasOn = soundBtn.getAttribute('aria-pressed') === 'true';

  if (wasOn) {
    player.mute();
    soundBtn.setAttribute('aria-pressed', 'false');
  } else {
    player.unMute();
    player.setVolume(60);
    soundBtn.setAttribute('aria-pressed', 'true');
  }

  const label = soundBtn.querySelector('.sound-label');
  const key = wasOn ? 'film.on' : 'film.off';
  label.dataset.i18n = key;
  label.textContent = DICTS[current][key];
});

// Stop the film once it has scrolled out of sight.
if ('IntersectionObserver' in window) {
  new IntersectionObserver((entries) => {
    if (!player || typeof player.pauseVideo !== 'function') return;
    for (const entry of entries) {
      if (entry.isIntersecting) player.playVideo();
      else player.pauseVideo();
    }
  }, { threshold: 0.2 }).observe(opening);
}

/* ---------- go ---------- */
wirePlates();
setLang(current);
document.getElementById('langToggle').addEventListener('click', () => {
  setLang(current === 'en' ? 'sq' : 'en');
});
