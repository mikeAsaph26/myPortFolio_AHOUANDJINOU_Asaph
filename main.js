/* ============================================================
   PORTFOLIO — AHOUANDJINOU Asaph Néri Michaël
   main.js — Logique principale
   ============================================================ */

/* ── État global ──────────────────────────────────────────── */
let currentLang = 'fr';
let currentCat  = 'all';   // filtre actif de l'onglet Rendus 3D

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

/** Nom du projet dans la langue courante (repli sur le français) */
function projName(p) {
  return (currentLang === 'en' && p.name_en) ? p.name_en : p.name;
}

/** Crée la carte HTML d'un projet */
function createCard(p, label) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <div class="project-img-wrap">
      <img class="project-img" src="${p.src}" alt="${projName(p)}" loading="lazy">
      <div class="project-label">${label}</div>
    </div>
    <div class="project-info">
      <div class="project-name">${projName(p)}</div>
      <div class="project-meta">AHOUANDJINOU Asaph</div>
    </div>
  `;
  card.addEventListener('click', () => openLightbox(p.src, projName(p)));
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
    (projects[key] || [])
      .filter(p => key !== 'rendus' || currentCat === 'all' || p.cat === currentCat)
      .forEach(p => {
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

/**
 * Envoi via Web3Forms (service gratuit, compatible GitHub Pages).
 * 1. Va sur https://web3forms.com et saisis asaphahouandjinou@gmail.com
 * 2. Copie la clé d'accès reçue par email et colle-la ci-dessous.
 * Tant que la clé n'est pas renseignée, le bouton ouvre ta messagerie
 * (mailto:) avec le message déjà rempli.
 */
const WEB3FORMS_KEY = 'c0079740-778b-492b-8f0f-c11b89477ed4';
const CONTACT_EMAIL = 'asaphahouandjinou@gmail.com';

async function sendMsg() {
  const name  = document.getElementById('fname')?.value?.trim();
  const email = document.getElementById('femail')?.value?.trim();
  const msg   = document.getElementById('fmsg')?.value?.trim();
  const fr    = currentLang === 'fr';
  const btn   = document.querySelector('.form-btn');

  if (!name || !email || !msg) {
    alert(fr ? 'Veuillez remplir tous les champs.' : 'Please fill in all fields.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert(fr ? 'Adresse email invalide.' : 'Invalid email address.');
    return;
  }

  const reset = () => {
    document.getElementById('fname').value  = '';
    document.getElementById('femail').value = '';
    document.getElementById('fmsg').value   = '';
  };

  /* Clé absente : repli sur la messagerie de l'utilisateur */
  if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'COLLE_TA_CLE_ICI') {
    const subject = encodeURIComponent((fr ? 'Message du portfolio — ' : 'Portfolio message — ') + name);
    const body    = encodeURIComponent(`${msg}\n\n${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    return;
  }

  const label = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = fr ? 'Envoi…' : 'Sending…'; }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject:    'Nouveau message depuis le portfolio — ' + name,
        from_name:  name,
        name, email, message: msg,
      }),
    });
    const data = await res.json();
    if (data.success) {
      alert(fr ? `Merci ${name} ! Votre message a bien été envoyé.`
               : `Thank you ${name}! Your message has been sent.`);
      reset();
    } else {
      throw new Error(data.message || 'Erreur');
    }
  } catch (err) {
    alert(fr ? `L'envoi a échoué. Écrivez-moi directement à ${CONTACT_EMAIL}.`
             : `Sending failed. Please email me directly at ${CONTACT_EMAIL}.`);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = label; }
  }
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

  /* Filtres de catégorie (Rendus 3D) */
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCat = btn.getAttribute('data-cat');
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b === btn));
      renderGrids();
    });
  });

  /* Onglets — attacher les listeners */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-tab');
      if (id) switchTab(id, btn);
    });
  });
});
