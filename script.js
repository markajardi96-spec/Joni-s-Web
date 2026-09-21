/* =========================================================
   Jonuz Markaj — recordings, language, booking, opening film
   ========================================================= */

/* ---------- recordings: click-to-load facades ---------- */
const VIDEOS = [
  { id: "qZPqkDOHuMo", work: "Mora Fjalë",                by: { sq: "tradicionale",     en: "traditional" } },
  { id: "06KV0G01k4E", work: "Obsesion",                  by: { sq: "Alban Skënderaj",  en: "Alban Skënderaj" } },
  { id: "z9pE8HtvNfc", work: "Ja Ku Jam",                 by: { sq: "Ardit Gjebrea",    en: "Ardit Gjebrea" } },
  { id: "ynxxdaoLRy0", work: "Martesa Jonë",              by: { sq: "për dasma",        en: "for weddings" } },
  { id: "zNiWqJARQfA", work: "Song from a Secret Garden", by: { sq: "Rolf Løvland",     en: "Rolf Løvland" } },
  { id: "ectMmQY2idw", work: "Pyete Hënën",               by: { sq: "piano",            en: "piano" } }
];

const grid = document.getElementById("videoGrid");

function renderPlates(lang) {
  grid.textContent = "";
  for (const v of VIDEOS) {
    const plate = document.createElement("article");
    plate.className = "plate";

    const btn = document.createElement("button");
    btn.className = "plate-frame";
    btn.type = "button";
    btn.style.backgroundImage = `url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)`;
    btn.setAttribute("aria-label", `${lang === "en" ? "Play" : "Luaj"} ${v.work}`);
    btn.innerHTML = '<span class="play"></span>';
    btn.addEventListener("click", () => {
      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`;
      frame.title = v.work;
      frame.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture";
      frame.allowFullscreen = true;
      btn.replaceWith(frame);
    });

    const cap = document.createElement("div");
    cap.className = "plate-caption";
    const work = document.createElement("span");
    work.className = "work";
    work.textContent = v.work;
    const by = document.createElement("span");
    by.className = "by";
    by.textContent = v.by[lang] || v.by.sq;
    cap.append(work, by);

    plate.append(btn, cap);
    grid.append(plate);
  }
}

/* ---------- language (Albanian is the markup default) ---------- */
const EN = {
  "skip": "Skip to content",
  "nav.about": "About", "nav.services": "Events", "nav.videos": "Recordings",
  "nav.repertoire": "Repertoire", "nav.book": "Book",

  "hero.role": "pianist",
  "hero.note": "Live piano for weddings, parties and events. The Albanian songs every guest knows by heart, and the pieces that fill the quiet between courses.",
  "hero.cta1": "Check your date", "hero.cta2": "Hear a recording",
  "hero.caption": "Obsesion, at a summer wedding",
  "film.on": "Sound on", "film.off": "Sound off",

  "note.title": "Every evening has its own rhythm. The programme is built around it.",
  "note.p1": "I'm Jonuz Markaj, a pianist. I work with the songs people hold close — <em>Mora Fjalë</em>, <em>Obsesion</em>, <em>Ja Ku Jam</em>, <em>Martesa Jonë</em> — and bring them to the piano the way the moment asks: soft while dinner is served, full when the family gets up to dance.",
  "note.p2": "Before I play, we talk through how the evening runs: the couple's entrance, the first dance, the moments that need music and the ones that need quiet. I don't arrive with a fixed set. I arrive with what suits your evening.",
  "note.p3": "I play solo, with a singer, or with a band, depending on the format you choose.",

  "ev.title": "Where I play",
  "ev.1.h": "Weddings",
  "ev.1.p": "Ceremony, reception and dinner, usually two to four hours with breaks. We choose the bride's entrance and the first dance together; through dinner I play under the conversation, and once the family is on its feet we move to the Albanian songs the room knows.",
  "ev.1.n": "An acoustic piano where there is one, otherwise digital with amplification.",
  "ev.2.h": "Private parties",
  "ev.2.p": "Birthdays, engagements, christenings. Sets of about forty-five minutes that lift the room slowly — guests stay at the table as long as they want to, and get up when the moment comes. I take their requests as the evening goes.",
  "ev.2.n": "Works in small spaces too, at home or in a restaurant.",
  "ev.3.h": "Corporate events",
  "ev.3.p": "Receptions, award ceremonies, business dinners, venue openings. The volume sits under the conversation, not over it: the music should fill the room without making anyone raise their voice.",
  "ev.3.n": "Written contract and invoice, formal dress.",

  "vid.title": "Recordings",
  "vid.lede": "Six pieces from my channel. Click one to listen.",
  "vid.more": "All recordings on YouTube",

  "rep.title": "Repertoire",
  "rep.lede": "Some of what I play. Special requests are welcome, just give me time to prepare them.",
  "rep.c1": "Albanian", "rep.c2": "International",
  "rep.trad": "traditional", "rep.wed": "for weddings",
  "rep.custom": "Requests on commission", "rep.ask": "by arrangement",

  "ct.title": "Book a date",
  "ct.lede": "Tell me the date, the venue and the kind of event. I reply within 48 hours with availability and a price.",
  "ct.phone": "Phone", "ct.email": "Email",
  "ct.f.name": "Name", "ct.f.contact": "Email or phone", "ct.f.date": "Event date",
  "ct.f.type": "Type", "ct.f.t1": "Wedding", "ct.f.t2": "Private party",
  "ct.f.t3": "Corporate event", "ct.f.t4": "Other",
  "ct.f.place": "Venue", "ct.f.msg": "Details", "ct.f.send": "Send request"
};

const SQ = {};
document.querySelectorAll("[data-i18n]").forEach(el => { SQ[el.dataset.i18n] = el.innerHTML; });
// The muted state is the one label the markup never renders, so seed it.
SQ["film.off"] = "Fik zërin";

let current = "sq";
try { current = localStorage.getItem("lang") === "en" ? "en" : "sq"; } catch (e) { /* private mode */ }

function setLang(lang) {
  const dict = lang === "en" ? EN : SQ;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const val = dict[el.dataset.i18n];
    if (val != null) el.innerHTML = val;
  });
  document.documentElement.lang = lang;
  document.getElementById("langToggle").textContent = lang === "en" ? "Shqip" : "English";
  renderPlates(lang);
  current = lang;
  try { localStorage.setItem("lang", lang); } catch (e) { /* private mode */ }
}

setLang(current);
document.getElementById("langToggle").addEventListener("click", () => {
  setLang(current === "en" ? "sq" : "en");
});

/* ---------- the film behind the opening ----------
   Autoplay is only permitted while muted, so it starts silent and the
   visitor turns the sound on. Everything here is an enhancement: if it
   never starts, the still stays the ground and the page is intact. */
const FILM_ID = "06KV0G01k4E";   // Obsesion — Alban Skënderaj
const FILM_START = 8;            // past the static opening frames

const opening = document.getElementById("top");
const soundBtn = document.getElementById("soundToggle");
let player = null;

function filmAllowed() {
  if (innerWidth < 720) return false;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = navigator.connection;
  if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ""))) return false;
  return true;
}

window.onYouTubeIframeAPIReady = () => {
  if (!filmAllowed() || !window.YT) return;

  player = new YT.Player("filmPlayer", {
    videoId: FILM_ID,
    playerVars: {
      autoplay: 1, mute: 1, controls: 0, loop: 1, playlist: FILM_ID,
      start: FILM_START, playsinline: 1, modestbranding: 1,
      rel: 0, iv_load_policy: 3, disablekb: 1, fs: 0
    },
    events: {
      onReady: e => { e.target.mute(); e.target.playVideo(); },
      onStateChange: e => {
        if (e.data === YT.PlayerState.PLAYING) {
          opening.classList.add("playing");
          soundBtn.hidden = false;
        }
      }
    }
  });
};

soundBtn.addEventListener("click", () => {
  if (!player) return;
  const wasOn = soundBtn.getAttribute("aria-pressed") === "true";
  if (wasOn) {
    player.mute();
    soundBtn.setAttribute("aria-pressed", "false");
  } else {
    player.unMute();
    player.setVolume(60);
    soundBtn.setAttribute("aria-pressed", "true");
  }
  const label = soundBtn.querySelector(".sound-label");
  const key = wasOn ? "film.on" : "film.off";
  label.dataset.i18n = key;
  label.innerHTML = current === "en" ? EN[key] : SQ[key];
});

// Stop the film once it has scrolled out of sight.
if ("IntersectionObserver" in window) {
  new IntersectionObserver(entries => {
    if (!player || typeof player.pauseVideo !== "function") return;
    for (const en of entries) {
      if (en.isIntersecting) player.playVideo();
      else player.pauseVideo();
    }
  }, { threshold: 0.2 }).observe(opening);
}

document.getElementById("year").textContent = new Date().getFullYear();
