/* ============================================================
   PORTFOLIO — AHOUANDJINOU Asaph Néri Michaël
   main.js — Logique principale
   ============================================================ */

/* ── État global ──────────────────────────────────────────── */
let currentLang = 'fr';

/* ── i18n ─────────────────────────────────────────────────── */

/**
 * Applique la langue choisie à toute la page.
 * @param {string} lang  Clé de langue ('fr' | 'en')
 */
function applyLang(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  const t = i18n[lang];

  /* Textes */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  /* Placeholders */
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  /* Bouton de langue */
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang === 'fr' ? '🌐 EN' : '🌐 FR';

  /* Sauvegarder la préférence */
  try { localStorage.setItem('portfolio_lang', lang); } catch (_) {}

  /* Regénérer les grilles avec les bons labels */
  renderGrids();
}

/* Toggle FR ↔ EN */
function toggleLang() {
  applyLang(currentLang === 'fr' ? 'en' : 'fr');
}

/* Détecter la langue au chargement */
function detectLang() {
  try {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved && i18n[saved]) return saved;
  } catch (_) {}
  const browser = (navigator.language || navigator.userLanguage || 'fr').toLowerCase();
  return browser.startsWith('fr') ? 'fr' : 'en';
}

/* ── Grilles de projets ───────────────────────────────────── */

/** Transforme un nom de fichier en titre lisible */
function niceName(fname) {
  return fname
    .replace(/\.[^.]+$/, '')        // enlever extension
    .replace(/[-_]/g, ' ')          // tirets → espaces
    .replace(/([a-z])([A-Z])/g, '$1 $2'); // camelCase → mots
}

/** Crée la carte HTML d'un projet */
function createCard(p, label) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <div class="project-img-wrap">
      <img class="project-img" src="${p.src}" alt="${p.name}" loading="lazy">
      <div class="project-label">${label}</div>
    </div>
    <div class="project-info">
      <div class="project-name">${p.name}</div>
      <div class="project-meta">AHOUANDJINOU Asaph</div>
    </div>
  `;
  card.addEventListener('click', () => openLightbox(p.src, p.name));
  return card;
}

/** Vide et remplit toutes les grilles */
function renderGrids() {
  const t = i18n[currentLang];

  const mapping = [
    { key: 'rendus',       gridId: 'grid-rendus', label: t.label_rendus },
    { key: 'pcb',          gridId: 'grid-pcb',    label: t.label_pcb    },
    { key: 'impressions3d',gridId: 'grid-print',  label: t.label_print  },
  ];

  mapping.forEach(({ key, gridId, label }) => {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = '';
    (projects[key] || []).forEach(p => {
      grid.appendChild(createCard(p, label));
    });
  });
}

/* ── Onglets ──────────────────────────────────────────────── */

/**
 * Active l'onglet sélectionné.
 * @param {string} id   'rendus' | 'pcb' | 'print'
 * @param {HTMLElement} btn  Le bouton cliqué
 */
function switchTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('tab-' + id);
  if (panel) panel.classList.add('active');
  if (btn)   btn.classList.add('active');
}

/* ── Lightbox ─────────────────────────────────────────────── */

function openLightbox(src, alt) {
  const lb   = document.getElementById('lightbox');
  const img  = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = src;
  img.alt = alt || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Menu mobile ──────────────────────────────────────────── */

function toggleMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('open');
}

/* ── Scroll reveal ────────────────────────────────────────── */

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Formulaire de contact ────────────────────────────────── */

function sendMsg() {
  const name  = document.getElementById('fname')?.value?.trim();
  const email = document.getElementById('femail')?.value?.trim();
  const msg   = document.getElementById('fmsg')?.value?.trim();

  if (!name || !email || !msg) {
    const warn = currentLang === 'fr'
      ? 'Veuillez remplir tous les champs.'
      : 'Please fill in all fields.';
    alert(warn);
    return;
  }

  const confirm = currentLang === 'fr'
    ? `Merci ${name} ! Votre message a bien été envoyé.`
    : `Thank you ${name}! Your message has been sent.`;
  alert(confirm);

  document.getElementById('fname').value  = '';
  document.getElementById('femail').value = '';
  document.getElementById('fmsg').value   = '';
}

/* ── Init ─────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* Langue initiale */
  applyLang(detectLang());

  /* Bouton langue */
  document.getElementById('langBtn')
    ?.addEventListener('click', toggleLang);

  /* Touche Échap pour fermer la lightbox */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* Scroll reveal */
  initReveal();

  /* Onglets — attacher les listeners */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-tab');
      if (id) switchTab(id, btn);
    });
  });
});
