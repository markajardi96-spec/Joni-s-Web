/* ---------- videos: click-to-load facades (keeps the page fast) ---------- */
const VIDEOS = [
  { id: "qZPqkDOHuMo", title: "Mora Fjalë", note: { sq: "Piano cover", en: "Piano cover" } },
  { id: "06KV0G01k4E", title: "Obsesion", note: { sq: "Alban Skënderaj", en: "Alban Skënderaj" } },
  { id: "z9pE8HtvNfc", title: "Ja Ku Jam", note: { sq: "Ardit Gjebrea", en: "Ardit Gjebrea" } },
  { id: "ynxxdaoLRy0", title: "Martesa Jonë", note: { sq: "Për dasma", en: "Wedding favourite" } },
  { id: "zNiWqJARQfA", title: "Song from a Secret Garden", note: { sq: "Instrumentale", en: "Instrumental" } },
  { id: "ectMmQY2idw", title: "Pyete Hënën", note: { sq: "Piano cover", en: "Piano cover" } }
];

const grid = document.getElementById("videoGrid");

function renderVideos(lang) {
  grid.innerHTML = "";
  for (const v of VIDEOS) {
    const card = document.createElement("article");
    card.className = "vid";

    const btn = document.createElement("button");
    btn.className = "vid-frame";
    btn.type = "button";
    btn.style.backgroundImage = `url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)`;
    btn.setAttribute("aria-label", `${lang === "en" ? "Play" : "Luaj"} ${v.title}`);
    btn.innerHTML = '<span class="play"></span>';
    btn.addEventListener("click", () => {
      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`;
      frame.title = v.title;
      frame.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture";
      frame.allowFullscreen = true;
      btn.replaceWith(frame);
    });

    const meta = document.createElement("div");
    meta.className = "vid-meta";
    meta.innerHTML = `<h3></h3><p></p>`;
    meta.querySelector("h3").textContent = v.title;
    meta.querySelector("p").textContent = v.note[lang] || v.note.sq;

    card.append(btn, meta);
    grid.append(card);
  }
}

/* ---------- translations ---------- */
const I18N = {
  en: {
    "nav.about": "About", "nav.services": "Events", "nav.videos": "Video",
    "nav.repertoire": "Repertoire", "nav.book": "Book",
    "hero.eyebrow": "Pianist · Live music",
    "hero.title": "Music the room remembers long after the piano stops",
    "hero.lede": "Live piano for weddings, family celebrations and corporate events — from the Albanian songs every guest knows by heart to the classics that fill the quiet between courses.",
    "hero.cta1": "Check your date", "hero.cta2": "Hear a performance",
    "hero.fact1": "recorded performances",
    "hero.fact2n": "Albanian & international", "hero.fact2": "a repertoire in two languages",
    "hero.fact3n": "Solo or with a band", "hero.fact3": "whatever the evening calls for",
    "about.title": "About",
    "about.p1": "I'm Jonuz Markaj, a pianist. I work with the songs people hold close — <em>Mora Fjalë</em>, <em>Obsesion</em>, <em>Ja Ku Jam</em>, <em>Martesa Jonë</em> — and bring them to the piano the way the moment asks: soft while dinner is served, full when the family gets up to dance.",
    "about.p2": "Every event has its own rhythm. Before I play, we talk through the evening: the couple's entrance, the first dance, the moments that need music and the moments that need quiet. The programme is built around you, not the other way round.",
    "about.p3": "My official YouTube channel collects over 30 performances — listen before you decide.",
    "svc.title": "Events",
    "svc.lede": "Three formats, each built for a different kind of evening.",
    "svc.1.h": "Weddings",
    "svc.1.p": "Ceremony, reception and dinner. The bride's entrance, the first dance, quiet music while guests arrive, and Albanian songs once the evening warms up.",
    "svc.1.l1": "First dance chosen together with you",
    "svc.1.l2": "2–4 hour programme, with breaks",
    "svc.1.l3": "Acoustic or amplified digital piano",
    "svc.2.h": "Private parties",
    "svc.2.p": "Birthdays, engagements, christenings, family celebrations. An atmosphere that builds slowly and keeps guests at the table, then on their feet.",
    "svc.2.l1": "Requests taken from your guests",
    "svc.2.l2": "Flexible 45-minute sets",
    "svc.2.l3": "Suited to smaller spaces",
    "svc.3.h": "Corporate events",
    "svc.3.p": "Receptions, award ceremonies, business dinners, venue openings. Music that supports conversation instead of covering it.",
    "svc.3.l1": "Volume calibrated for conversation",
    "svc.3.l2": "Discreet presence, formal dress",
    "svc.3.l3": "Written contract and invoice",
    "vid.title": "Performances",
    "vid.lede": "Recordings from the official channel. Click to listen.",
    "vid.more": "All videos on YouTube",
    "rep.title": "Repertoire",
    "rep.lede": "A sample of what I play. Special requests are welcome — just give me time to prepare them.",
    "rep.c1": "Albanian", "rep.c2": "International & classical", "rep.custom": "Requests on commission",
    "ct.title": "Book a date",
    "ct.lede": "Tell me the date, the venue and the kind of event. I reply within 48 hours with availability and a price.",
    "ct.phone": "Phone", "ct.email": "Email",
    "ct.f.name": "Name", "ct.f.contact": "Email or phone", "ct.f.date": "Event date",
    "ct.f.type": "Type", "ct.f.t1": "Wedding", "ct.f.t2": "Private party",
    "ct.f.t3": "Corporate event", "ct.f.t4": "Other",
    "ct.f.place": "Venue", "ct.f.msg": "Details", "ct.f.send": "Send request"
  }
};

const SQ = {}; // filled from the DOM on first load (Albanian is the markup default)

function cacheAlbanian() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    SQ[el.dataset.i18n] = el.innerHTML;
  });
}

function setLang(lang) {
  const dict = lang === "en" ? I18N.en : SQ;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const val = dict[el.dataset.i18n];
    if (val != null) el.innerHTML = val;
  });
  document.documentElement.lang = lang;
  document.getElementById("langToggle").textContent = lang === "en" ? "SQ" : "EN";
  renderVideos(lang);
  try { localStorage.setItem("lang", lang); } catch (e) { /* private mode */ }
}

cacheAlbanian();
let current = "sq";
try { current = localStorage.getItem("lang") || "sq"; } catch (e) { /* private mode */ }
setLang(current);

document.getElementById("langToggle").addEventListener("click", () => {
  current = current === "en" ? "sq" : "en";
  setLang(current);
});

/* ---------- booking form ---------- */
const form = document.getElementById("bookForm");
const note = document.getElementById("formNote");
const EMAIL = document.querySelector('[data-contact="email"]').textContent.trim();

form.addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(form);
  if (!f.get("name") || !f.get("contact")) {
    note.textContent = current === "en"
      ? "Please add your name and a way to reach you."
      : "Ju lutem shtoni emrin dhe një mënyrë kontakti.";
    return;
  }
  const subject = `${f.get("type")} — ${f.get("date") || "date TBC"} — ${f.get("name")}`;
  const body = [
    `${current === "en" ? "Name" : "Emri"}: ${f.get("name")}`,
    `${current === "en" ? "Contact" : "Kontakti"}: ${f.get("contact")}`,
    `${current === "en" ? "Date" : "Data"}: ${f.get("date") || "-"}`,
    `${current === "en" ? "Type" : "Lloji"}: ${f.get("type")}`,
    `${current === "en" ? "Venue" : "Vendi"}: ${f.get("place") || "-"}`,
    "",
    f.get("message") || ""
  ].join("\n");
  window.location.href =
    `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = current === "en"
    ? "Opening your email app…"
    : "Po hapet aplikacioni i email-it…";
});

/* ---------- small touches ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 10), { passive: true });

const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: .12 });
document.querySelectorAll(".section > *, .hero-inner > *").forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${Math.min(i, 4) * 60}ms`;
  io.observe(el);
});
