/* =========================================================
   Jonuz Markaj — plates, translation, reply card
   ========================================================= */

/* ---------- plates: click-to-load facades, so the page stays light ---------- */
const VIDEOS = [
  { id: "qZPqkDOHuMo", work: "Mora Fjalë",                 attrib: { sq: "Tradicionale",  en: "Traditional" } },
  { id: "06KV0G01k4E", work: "Obsesion",                   attrib: { sq: "A. Skënderaj",  en: "A. Skënderaj" } },
  { id: "z9pE8HtvNfc", work: "Ja Ku Jam",                  attrib: { sq: "A. Gjebrea",    en: "A. Gjebrea" } },
  { id: "ynxxdaoLRy0", work: "Martesa Jonë",               attrib: { sq: "Për dasma",     en: "For weddings" } },
  { id: "zNiWqJARQfA", work: "Song from a Secret Garden",  attrib: { sq: "R. Løvland",    en: "R. Løvland" } },
  { id: "ectMmQY2idw", work: "Pyete Hënën",                attrib: { sq: "Piano cover",   en: "Piano cover" } }
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
    btn.setAttribute("aria-label", `${lang === "en" ? "Play" : "Luaj"} — ${v.work}`);
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
    const leader = document.createElement("span");
    leader.className = "leader";
    leader.setAttribute("aria-hidden", "true");
    const attrib = document.createElement("span");
    attrib.className = "attrib";
    attrib.textContent = v.attrib[lang] || v.attrib.sq;
    cap.append(work, leader, attrib);

    plate.append(btn, cap);
    grid.append(plate);
  }
}

/* ---------- translation (Albanian is the markup default) ---------- */
const EN = {
  "skip": "Skip to content",
  "nav.about": "Note", "nav.services": "Programme", "nav.videos": "Recordings",
  "nav.repertoire": "Repertoire", "nav.book": "Book",

  "hero.stamp": "Weddings &middot; Parties &middot; Events",
  "hero.role": "Pianist",
  "hero.note": "Live piano for your evening — from the Albanian songs every guest knows by heart to the pieces that fill the quiet between courses.",
  "hero.cta1": "Check your date", "hero.cta2": "Hear a recording",

  "col.1t": "Formats", "col.1d": "Solo · with a singer · with a band",
  "col.2t": "Repertoire", "col.2d": "Albanian &amp; international",
  "col.3t": "Recordings", "col.3d": "33 on the official channel",

  "about.label": "Programme note",
  "about.title": "Every evening has its own rhythm. The programme is built around it.",
  "about.p1": "I'm Jonuz Markaj, a pianist. I work with the songs people hold close — <em>Mora Fjalë</em>, <em>Obsesion</em>, <em>Ja Ku Jam</em>, <em>Martesa Jonë</em> — and bring them to the piano the way the moment asks: soft while dinner is served, full when the family gets up to dance.",
  "about.p2": "Before I play, we talk through the flow: the couple's entrance, the first dance, the moments that need music and the ones that need quiet. I don't arrive with a fixed set — I arrive with what suits your evening.",
  "about.aside.l": "From the channel",
  "about.aside.q": "Over 30 recorded performances. Listen before you decide.",

  "svc.label": "The programme", "svc.title": "Three formats",
  "svc.1.h": "Weddings", "svc.1.t": "Andante &mdash; 2–4 hrs",
  "svc.1.p": "Ceremony, reception and dinner. The bride's entrance, the first dance, quiet music as guests arrive, and Albanian songs once the evening warms up.",
  "svc.1.l1": "First dance chosen together with you",
  "svc.1.l2": "Programme with planned breaks",
  "svc.1.l3": "Acoustic or amplified digital piano",
  "svc.2.h": "Private parties", "svc.2.t": "Allegretto &mdash; 45′ sets",
  "svc.2.p": "Birthdays, engagements, christenings, family celebrations. An atmosphere that builds slowly, keeps guests at the table, then on their feet.",
  "svc.2.l1": "Requests taken from your guests",
  "svc.2.l2": "Flexible sets that follow the room",
  "svc.2.l3": "Suited to smaller spaces",
  "svc.3.h": "Corporate events", "svc.3.t": "Sotto voce &mdash; 1–3 hrs",
  "svc.3.p": "Receptions, award ceremonies, business dinners, venue openings. Music that carries the conversation instead of covering it.",
  "svc.3.l1": "Volume calibrated for conversation",
  "svc.3.l2": "Discreet presence, formal dress",
  "svc.3.l3": "Written contract and invoice",

  "vid.label": "Recordings", "vid.title": "From the official channel",
  "vid.lede": "Six selected pieces. Click to listen.",
  "vid.more": "All videos on YouTube",

  "rep.label": "Repertoire", "rep.title": "A sample of what I play",
  "rep.lede": "Special requests are welcome — just give me time to prepare them.",
  "rep.c1": "Part I &mdash; Albanian", "rep.c2": "Part II &mdash; International",
  "rep.trad": "traditional", "rep.wed": "for weddings",
  "rep.custom": "Requests on commission", "rep.ask": "by arrangement",

  "ct.label": "Reply card", "ct.title": "Book a date",
  "ct.lede": "Tell me the date, the venue and the kind of event. I reply within 48 hours with availability and a price.",
  "ct.phone": "Phone", "ct.email": "Email",
  "ct.f.name": "Name", "ct.f.contact": "Email or phone", "ct.f.date": "Event date",
  "ct.f.type": "Type", "ct.f.t1": "Wedding", "ct.f.t2": "Private party",
  "ct.f.t3": "Corporate event", "ct.f.t4": "Other",
  "ct.f.place": "Venue", "ct.f.msg": "Details", "ct.f.send": "Send request"
};

const SQ = {};
document.querySelectorAll("[data-i18n]").forEach(el => { SQ[el.dataset.i18n] = el.innerHTML; });

let current = "sq";
try { current = localStorage.getItem("lang") === "en" ? "en" : "sq"; } catch (e) { /* private mode */ }

function setLang(lang) {
  const dict = lang === "en" ? EN : SQ;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const val = dict[el.dataset.i18n];
    if (val != null) el.innerHTML = val;
  });
  document.documentElement.lang = lang;
  document.getElementById("langToggle").textContent = lang === "en" ? "SQ" : "EN";
  renderPlates(lang);
  current = lang;
  try { localStorage.setItem("lang", lang); } catch (e) { /* private mode */ }
}

setLang(current);

document.getElementById("langToggle").addEventListener("click", () => {
  setLang(current === "en" ? "sq" : "en");
});

/* ---------- reply card ---------- */
const form = document.getElementById("bookForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(form);
  const en = current === "en";

  if (!String(f.get("name") || "").trim() || !String(f.get("contact") || "").trim()) {
    note.textContent = en
      ? "Add your name and a way to reach you."
      : "Shtoni emrin dhe një mënyrë kontakti.";
    return;
  }

  const email = document.querySelector('[data-contact="email"]').textContent.trim();
  const subject = `${f.get("type")} — ${f.get("date") || (en ? "date TBC" : "data pa caktuar")} — ${f.get("name")}`;
  const body = [
    `${en ? "Name" : "Emri"}: ${f.get("name")}`,
    `${en ? "Contact" : "Kontakti"}: ${f.get("contact")}`,
    `${en ? "Date" : "Data"}: ${f.get("date") || "—"}`,
    `${en ? "Type" : "Lloji"}: ${f.get("type")}`,
    `${en ? "Venue" : "Vendi"}: ${f.get("place") || "—"}`,
    "",
    f.get("message") || ""
  ].join("\n");

  window.location.href =
    `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = en ? "Opening your email app…" : "Po hapet aplikacioni i email-it…";
});

/* ---------- small touches ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

const masthead = document.getElementById("masthead");
addEventListener("scroll", () => {
  masthead.classList.toggle("scrolled", scrollY > 8);
}, { passive: true });
