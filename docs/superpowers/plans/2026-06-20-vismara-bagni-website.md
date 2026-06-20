# Vismara Bagni Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page static website for Vismara Bagni (artisan bathroom showroom in Paderno Dugnano), deployed via GitHub + Netlify, with contact form, photo gallery, team section, services, and reviews — all aligned to the spec at `docs/superpowers/specs/2026-06-20-vismara-bagni-website-design.md`.

**Architecture:** Single `index.html` with 6 anchored sections, sticky header with smooth-scroll nav, plain CSS (custom properties + utility-light), three small vanilla JS modules (nav, gallery, form). Logo authored as SVG. Team and project photos pre-processed locally via ImageMagick (fallback Python+Pillow). Form submission via Netlify Forms. Repo: `vismara-bagni-sito` on GitHub, deployed automatically by Netlify.

**Tech Stack:** HTML5, CSS3 (custom properties, flex, grid), vanilla JavaScript (ES2020), SVG, ImageMagick CLI (or Pillow), Netlify Forms, GitHub, Netlify.

**Verification model:** This is a static site without unit tests. Each task is verified by (a) opening `index.html` in the browser via the Python local server, (b) checking the change is visible/correct, (c) committing. The plan substitutes "write a test that fails" with "describe the visible behavior we expect to see and verify it after implementation."

---

## File structure (final state)

```
sito/
├── index.html              # whole site
├── css/
│   └── style.css          # all styles
├── js/
│   ├── nav.js              # sticky nav, hamburger, scroll-spy, smooth-scroll
│   ├── gallery.js         # lightbox for #lavori
│   └── form.js             # form validation + inline submit feedback
├── img/
│   ├── logo.svg
│   ├── favicon.svg
│   ├── team/{walter,fabrizio}.jpg          # 600x600, processed
│   └── lavori/
│       ├── 01.jpg ... 12.jpg               # 1600px long edge, q82
│       └── thumb/01.jpg ... 12.jpg         # 800px long edge, q80
├── netlify.toml
├── README.md
├── .gitignore
└── docs/superpowers/
    ├── specs/2026-06-20-vismara-bagni-website-design.md
    └── plans/2026-06-20-vismara-bagni-website.md
```

---

## Task 1: Project scaffold

**Files:**
- Create: `sito/.gitignore`
- Create: `sito/README.md`
- Create: `sito/netlify.toml`
- Create: `sito/css/style.css` (empty placeholder)
- Create: `sito/js/nav.js` (empty placeholder)
- Create: `sito/js/gallery.js` (empty placeholder)
- Create: `sito/js/form.js` (empty placeholder)

- [ ] **Step 1: Create `.gitignore`**

```gitignore
# OS
.DS_Store
Thumbs.db
desktop.ini

# Editor
.vscode/
.idea/
*.swp

# Working files (raw source photos — only optimized ones get committed)
/_raw_photos/
node_modules/
```

- [ ] **Step 2: Create `README.md`**

```markdown
# Vismara Bagni — sito web

Sito vetrina one-page di Vismara Bagni snc (Paderno Dugnano, MI).

## Stack
HTML / CSS / JavaScript vanilla. Nessun build step.

## Sviluppo locale
```bash
cd sito
python -m http.server 8000
# apri http://localhost:8000
```

## Deploy
Push su `main` → Netlify rilascia automaticamente.

## Form preventivo
Gestito da Netlify Forms. Le richieste arrivano a `vismarasnc@tiscalinet.it`
e sono consultabili nella dashboard Netlify.
```

- [ ] **Step 3: Create `netlify.toml`**

```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

- [ ] **Step 4: Create empty placeholder files**

```bash
touch sito/css/style.css sito/js/nav.js sito/js/gallery.js sito/js/form.js
```

- [ ] **Step 5: Initialize git and commit**

```bash
cd "sito"
git init -b main
git add .gitignore README.md netlify.toml css js docs
git commit -m "chore: scaffold project + netlify config"
```

---

## Task 2: CSS foundation (variables, reset, typography)

**Files:**
- Modify: `sito/css/style.css`

- [ ] **Step 1: Define expected visible behavior**

After this task, opening `index.html` (even empty body) should:
- Load Inter + Poppins from Google Fonts
- Apply system-style reset (no default margins on body, box-sizing border-box, base font 17px)
- Make all CSS variables from the spec palette available globally

- [ ] **Step 2: Write `css/style.css` foundation**

```css
/* === Vismara Bagni — stylesheet === */

/* --- Fonts --- */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap");

/* --- Design tokens --- */
:root {
  --c-primary: #2A7BC0;
  --c-primary-dark: #0F3D6E;
  --c-accent: #E89559;
  --c-bg: #FAFAFA;
  --c-text: #4A4A4A;
  --c-border: #E5E7EB;
  --c-white: #FFFFFF;
  --c-success: #2F9E44;
  --c-error: #D62828;

  --ff-display: "Poppins", system-ui, sans-serif;
  --ff-body: "Inter", system-ui, sans-serif;

  --fs-base: 17px;
  --fs-h1: clamp(2rem, 5vw, 3.5rem);
  --fs-h2: clamp(1.6rem, 3.5vw, 2.4rem);
  --fs-h3: 1.25rem;

  --sp-1: 0.5rem;
  --sp-2: 1rem;
  --sp-3: 1.5rem;
  --sp-4: 2rem;
  --sp-6: 3rem;
  --sp-8: 4rem;
  --sp-12: 6rem;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;

  --shadow-sm: 0 1px 3px rgba(15, 61, 110, 0.08);
  --shadow-md: 0 6px 24px rgba(15, 61, 110, 0.12);

  --container: 1180px;
  --header-h: 76px;
}

/* --- Reset --- */
*, *::before, *::after { box-sizing: border-box; }
html { font-size: var(--fs-base); scroll-behavior: smooth; scroll-padding-top: var(--header-h); }
body {
  margin: 0;
  font-family: var(--ff-body);
  color: var(--c-text);
  background: var(--c-bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; }

h1, h2, h3 {
  font-family: var(--ff-display);
  color: var(--c-primary-dark);
  line-height: 1.2;
  margin: 0 0 var(--sp-3);
}
h1 { font-size: var(--fs-h1); font-weight: 700; }
h2 { font-size: var(--fs-h2); font-weight: 600; }
h3 { font-size: var(--fs-h3); font-weight: 600; }

p { margin: 0 0 var(--sp-2); }

.container {
  width: min(100% - 2 * var(--sp-3), var(--container));
  margin-inline: auto;
}

section { padding: var(--sp-12) 0; }
@media (max-width: 720px) { section { padding: var(--sp-8) 0; } }
```

- [ ] **Step 3: Verify visually**

Create a minimal `index.html` stub if not present, open `http://localhost:8000`, confirm:
- Fonts load (titles render in Poppins, body in Inter)
- No horizontal scroll on mobile
- Body has the off-white `#FAFAFA` background

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat(css): add design tokens, fonts, and reset"
```

---

## Task 3: Logo SVG + favicon

**Files:**
- Create: `sito/img/logo.svg`
- Create: `sito/img/favicon.svg`

- [ ] **Step 1: Write `img/logo.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" role="img" aria-label="Vismara Bagni">
  <defs>
    <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E89559"/>
      <stop offset="100%" stop-color="#D87738"/>
    </linearGradient>
  </defs>
  <!-- Goccia stilizzata, accento arancio -->
  <path d="M40 8 C 56 28, 64 42, 56 56 C 50 68, 30 68, 24 56 C 16 42, 24 28, 40 8 Z"
        fill="url(#dropGrad)" />
  <!-- "vismara" corsivo blu -->
  <text x="86" y="38"
        font-family="Poppins, sans-serif" font-weight="600" font-style="italic"
        font-size="30" fill="#2A7BC0" letter-spacing="-0.5">vismara</text>
  <!-- "arredamenti" piccolo grigio -->
  <text x="88" y="52"
        font-family="Inter, sans-serif" font-weight="500"
        font-size="10" fill="#7B7B7B" letter-spacing="2.5">ARREDAMENTI</text>
  <!-- "bagni" bold blu navy -->
  <text x="86" y="74"
        font-family="Poppins, sans-serif" font-weight="700"
        font-size="22" fill="#0F3D6E" letter-spacing="-0.3">bagni</text>
</svg>
```

- [ ] **Step 2: Write `img/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0F3D6E"/>
  <path d="M32 10 C 44 26, 50 38, 44 50 C 39 60, 25 60, 20 50 C 14 38, 20 26, 32 10 Z"
        fill="#E89559"/>
  <text x="32" y="44" text-anchor="middle"
        font-family="Poppins, sans-serif" font-weight="700"
        font-size="22" fill="#FFFFFF">V</text>
</svg>
```

- [ ] **Step 3: Verify**

Open both SVG files in browser directly (`file://.../img/logo.svg`). Confirm: drop shape orange, "vismara" italic blue, "ARREDAMENTI" small gray, "bagni" navy bold. Favicon: square navy with orange drop and white V.

- [ ] **Step 4: Commit**

```bash
git add img/logo.svg img/favicon.svg
git commit -m "feat(brand): add SVG logo and favicon"
```

---

## Task 4: HTML skeleton + sticky header with nav

**Files:**
- Create: `sito/index.html`
- Modify: `sito/css/style.css` (append header styles)

- [ ] **Step 1: Write `index.html` skeleton**

```html
<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Vismara Bagni — Arredo bagno su misura a Paderno Dugnano (MI)</title>
  <meta name="description" content="Vismara Bagni: box doccia, mobili bagno e progettazione su misura. 45 anni di artigianato a Paderno Dugnano. Preventivi gratuiti.">
  <link rel="icon" type="image/svg+xml" href="img/favicon.svg">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <header class="site-header" id="site-header">
    <div class="container site-header__inner">
      <a href="#home" class="site-header__logo" aria-label="Vismara Bagni — home">
        <img src="img/logo.svg" alt="Vismara Bagni" height="44">
      </a>

      <nav class="site-nav" aria-label="Navigazione principale">
        <button class="site-nav__toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Apri menu">
          <span></span><span></span><span></span>
        </button>
        <ul id="primary-nav" class="site-nav__list">
          <li><a href="#chi-siamo">Chi siamo</a></li>
          <li><a href="#servizi">Servizi</a></li>
          <li><a href="#lavori">Lavori</a></li>
          <li><a href="#recensioni">Recensioni</a></li>
          <li><a href="#contatti">Contatti</a></li>
        </ul>
      </nav>

      <a href="#contatti" class="btn btn--accent btn--small site-header__cta">Preventivo gratuito</a>
    </div>
  </header>

  <main>
    <!-- Sezioni qui (Task 5+) -->
    <section id="home" class="hero"><div class="container"><h1>Vismara Bagni</h1></div></section>
  </main>

  <a href="https://wa.me/393356529601?text=Ciao,%20vorrei%20informazioni%20su…"
     class="whatsapp-fab" aria-label="Scrivici su WhatsApp" target="_blank" rel="noopener">
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <path fill="currentColor" d="M16 3C9 3 3 9 3 16c0 2.6.8 5 2.2 7L3 29l6.2-2.1A13 13 0 0 0 29 16c0-7-6-13-13-13zm7.5 18.2c-.3.9-1.7 1.7-2.4 1.8-.6.1-1.4.1-2.3-.1-.5-.2-1.2-.4-2.1-.8-3.7-1.6-6.1-5.3-6.3-5.6-.2-.3-1.6-2.1-1.6-4s1-2.8 1.4-3.2c.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.8.6.3.7 1 2.5 1.1 2.7.1.2.1.4 0 .6-.1.2-.1.3-.3.5l-.5.6c-.2.2-.4.4-.2.7.2.3 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.3.2.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1.3.1 1.9.9 2.2 1.1.3.2.5.2.6.4.2.1.2.6-.1 1.4z"/>
    </svg>
  </a>

  <script src="js/nav.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Append header + button + WhatsApp FAB styles to `css/style.css`**

```css
/* --- Buttons --- */
.btn {
  display: inline-block;
  padding: 0.85em 1.6em;
  border-radius: 999px;
  font-weight: 600;
  font-family: var(--ff-display);
  border: 2px solid transparent;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  text-align: center;
}
.btn--small { padding: 0.6em 1.2em; font-size: 0.95rem; }
.btn--accent { background: var(--c-accent); color: var(--c-white); }
.btn--accent:hover { background: #d6803f; transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn--ghost { color: var(--c-white); border-color: var(--c-white); background: transparent; }
.btn--ghost:hover { background: rgba(255,255,255,0.15); }
.btn--primary { background: var(--c-primary); color: var(--c-white); }
.btn--primary:hover { background: var(--c-primary-dark); }

/* --- Header --- */
.site-header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(250,250,250,0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--c-border);
  height: var(--header-h);
}
.site-header__inner {
  height: 100%;
  display: flex; align-items: center; justify-content: space-between;
  gap: var(--sp-3);
}
.site-header__logo img { height: 44px; width: auto; }

.site-nav__list {
  list-style: none; margin: 0; padding: 0;
  display: flex; gap: var(--sp-3);
}
.site-nav__list a {
  font-weight: 500; padding: 0.4em 0.2em;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}
.site-nav__list a:hover { color: var(--c-primary); }
.site-nav__list a.is-active { color: var(--c-primary); border-bottom-color: var(--c-primary); }

.site-nav__toggle {
  display: none;
  width: 44px; height: 44px;
  background: transparent; border: 0; padding: 8px;
  flex-direction: column; justify-content: space-between;
}
.site-nav__toggle span {
  display: block; height: 3px; background: var(--c-primary-dark); border-radius: 2px;
  transition: transform 0.2s, opacity 0.2s;
}

/* Mobile nav */
@media (max-width: 860px) {
  .site-header__cta { display: none; }
  .site-nav__toggle { display: flex; }
  .site-nav__list {
    position: fixed; inset: var(--header-h) 0 0 0;
    flex-direction: column; align-items: center; justify-content: center;
    background: var(--c-white);
    gap: var(--sp-4);
    transform: translateX(100%);
    transition: transform 0.25s ease;
    font-size: 1.4rem;
  }
  .site-nav.is-open .site-nav__list { transform: translateX(0); }
  .site-nav.is-open .site-nav__toggle span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .site-nav.is-open .site-nav__toggle span:nth-child(2) { opacity: 0; }
  .site-nav.is-open .site-nav__toggle span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
}

/* --- WhatsApp floating action button --- */
.whatsapp-fab {
  position: fixed; right: 20px; bottom: 20px; z-index: 60;
  width: 60px; height: 60px; border-radius: 50%;
  background: #25D366; color: white;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 18px rgba(37, 211, 102, 0.45);
  transition: transform 0.15s ease;
}
.whatsapp-fab:hover { transform: scale(1.06); }
```

- [ ] **Step 3: Verify visually**

Run `python -m http.server 8000` from `sito/`. Open `http://localhost:8000`. Confirm:
- Header sticks to top while scrolling
- Logo + 5 nav links visible on desktop
- Orange "Preventivo gratuito" pill button on right
- Resize browser to <860px: nav links collapse, hamburger button appears, CTA disappears
- WhatsApp green button fixed bottom right

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: HTML skeleton, sticky header, mobile nav, WhatsApp FAB"
```

---

## Task 5: Hero section (#home)

**Files:**
- Modify: `sito/index.html` (replace stub hero)
- Modify: `sito/css/style.css` (append hero styles)
- Use: one of `img/lavori/01.jpg` once available (Task 11). Until then, use a temporary solid color background.

- [ ] **Step 1: Replace stub hero in `index.html`**

```html
<section id="home" class="hero">
  <div class="hero__overlay"></div>
  <div class="container hero__inner">
    <h1>Il bagno che hai in mente,<br>fatto su misura per te.</h1>
    <p class="hero__lede">
      <strong>45 anni di esperienza artigiana</strong> al servizio del tuo progetto.<br>
      Non vendiamo mobili in scatola: progettiamo, costruiamo e installiamo ogni bagno
      <strong>su misura</strong>, per durare nel tempo e per essere
      <strong>esattamente come lo vuoi tu</strong>.
    </p>
    <div class="hero__cta">
      <a href="#contatti" class="btn btn--accent">Richiedi un preventivo gratuito</a>
      <a href="#lavori" class="btn btn--ghost">Scopri i nostri lavori</a>
    </div>
    <ul class="hero__badges" aria-label="Punti di forza">
      <li>⭐ 4.8/5 su Google</li>
      <li>📍 Paderno Dugnano (MI)</li>
      <li>🛠 45 anni di artigianato</li>
    </ul>
  </div>
</section>
```

- [ ] **Step 2: Append hero styles**

```css
/* --- Hero --- */
.hero {
  position: relative;
  min-height: calc(100svh - var(--header-h));
  background:
    linear-gradient(135deg, rgba(15,61,110,0.78), rgba(15,61,110,0.55)),
    #0F3D6E url("../img/lavori/01.jpg") center / cover no-repeat;
  color: var(--c-white);
  display: flex; align-items: center;
  padding: var(--sp-8) 0;
}
.hero__inner { max-width: 880px; }
.hero h1 { color: var(--c-white); margin-bottom: var(--sp-3); }
.hero__lede { font-size: 1.15rem; margin-bottom: var(--sp-4); max-width: 700px; }
.hero__cta { display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: var(--sp-4); }
.hero__badges {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-wrap: wrap; gap: var(--sp-3);
  font-size: 0.95rem; opacity: 0.9;
}
```

- [ ] **Step 3: Verify visually**

Reload `http://localhost:8000`. Confirm:
- Hero fills nearly full viewport
- White text readable over navy background (gradient even without photo)
- H1 wraps cleanly on mobile
- Two CTAs visible: orange filled + white outlined
- Three badges in a row below

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat(hero): add hero section with CTA buttons and trust badges"
```

---

## Task 6: Chi siamo section (#chi-siamo)

**Files:**
- Modify: `sito/index.html` (append after hero)
- Modify: `sito/css/style.css` (append)

- [ ] **Step 1: Insert chi-siamo into `index.html` (after `</section>` of hero, before `</main>`)**

```html
<section id="chi-siamo" class="chi-siamo">
  <div class="container">
    <p class="section-eyebrow">Chi siamo</p>
    <h2>Due fratelli, un mestiere:<br>il bagno fatto come si deve.</h2>
    <div class="chi-siamo__lede">
      <p>
        Vismara Bagni è la storia di <strong>Walter e Fabrizio Vismara</strong>, due fratelli
        che da oltre 45 anni hanno scelto di fare le cose in un solo modo: <strong>bene</strong>.
        Niente cataloghi standard, niente soluzioni preconfezionate. Ogni bagno che firmiamo nasce
        dall'ascolto del cliente, dal sopralluogo a casa sua, e dal lavoro artigiano del nostro
        showroom di Paderno Dugnano.
      </p>
      <p>
        In un mondo di grandi distributori, abbiamo scelto di restare <strong>artigiani</strong>.
        Perché un bagno non è un mobile da assemblare: è uno spazio che userai ogni giorno
        per vent'anni.
      </p>
    </div>

    <div class="team">
      <article class="team-card">
        <img src="img/team/walter.jpg" alt="Walter Vismara" loading="lazy" width="280" height="280">
        <h3>Walter Vismara</h3>
        <p class="team-card__role">Titolare · Area commerciale</p>
        <p>
          Il primo volto che incontri varcando la porta del nostro showroom. Ascolta le tue
          esigenze, ti guida nella scelta dei materiali e ti accompagna passo passo fino alla
          consegna. 45 anni di esperienza per capire al volo cosa serve davvero a chi ha di fronte.
        </p>
      </article>
      <article class="team-card">
        <img src="img/team/fabrizio.jpg" alt="Fabrizio Vismara" loading="lazy" width="280" height="280">
        <h3>Fabrizio Vismara</h3>
        <p class="team-card__role">Titolare · Area tecnica</p>
        <p>
          La mente dietro ogni progetto. Si occupa dei rilievi, della progettazione su misura
          e della scelta dei materiali più adatti al tuo bagno. Trasforma vincoli di spazio
          in soluzioni eleganti che funzionano davvero.
        </p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* --- Section helpers --- */
.section-eyebrow {
  font-family: var(--ff-display);
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--c-accent);
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0 0 var(--sp-2);
}

/* --- Chi siamo --- */
.chi-siamo__lede {
  max-width: 800px;
  margin-bottom: var(--sp-6);
  font-size: 1.05rem;
}
.team {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--sp-4);
}
.team-card {
  background: var(--c-white);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: var(--sp-4);
  box-shadow: var(--shadow-sm);
  text-align: center;
}
.team-card img {
  width: 200px; height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto var(--sp-3);
  border: 4px solid var(--c-bg);
  box-shadow: var(--shadow-sm);
}
.team-card h3 { margin-bottom: 0.25rem; }
.team-card__role {
  color: var(--c-primary);
  font-weight: 500;
  margin-bottom: var(--sp-2);
}
.team-card p { text-align: left; }
```

- [ ] **Step 3: Add temporary placeholder images so layout doesn't break before Task 10**

```bash
mkdir -p img/team
# Crea due placeholder 1x1 grigi temporanei (saranno sostituiti in Task 10)
printf '\xFF\xD8\xFF\xE0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00\xFF\xDB\x00\x43\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\x09\x09\x08\x0A\x0C\x14\x0D\x0C\x0B\x0B\x0C\x19\x12\x13\x0F\x14\x1D\x1A\x1F\x1E\x1D\x1A\x1C\x1C\x20\x24\x2E\x27\x20\x22\x2C\x23\x1C\x1C\x28\x37\x29\x2C\x30\x31\x34\x34\x34\x1F\x27\x39\x3D\x38\x32\x3C\x2E\x33\x34\x32\xFF\xC0\x00\x0B\x08\x00\x01\x00\x01\x01\x01\x11\x00\xFF\xC4\x00\x1F\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0A\x0B\xFF\xC4\x00\xB5\x10\x00\x02\x01\x03\x03\x02\x04\x03\x05\x05\x04\x04\x00\x00\x01\x7D\x01\x02\x03\x00\x04\x11\x05\x12\x21\x31\x41\x06\x13\x51\x61\x07\x22\x71\x14\x32\x81\x91\xA1\x08\x23\x42\xB1\xC1\x15\x52\xD1\xF0\x24\x33\x62\x72\x82\x09\x0A\x16\x17\x18\x19\x1A\x25\x26\x27\x28\x29\x2A\x34\x35\x36\x37\x38\x39\x3A\x43\x44\x45\x46\x47\x48\x49\x4A\x53\x54\x55\x56\x57\x58\x59\x5A\x63\x64\x65\x66\x67\x68\x69\x6A\x73\x74\x75\x76\x77\x78\x79\x7A\x83\x84\x85\x86\x87\x88\x89\x8A\x92\x93\x94\x95\x96\x97\x98\x99\x9A\xA2\xA3\xA4\xA5\xA6\xA7\xA8\xA9\xAA\xB2\xB3\xB4\xB5\xB6\xB7\xB8\xB9\xBA\xC2\xC3\xC4\xC5\xC6\xC7\xC8\xC9\xCA\xD2\xD3\xD4\xD5\xD6\xD7\xD8\xD9\xDA\xE1\xE2\xE3\xE4\xE5\xE6\xE7\xE8\xE9\xEA\xF1\xF2\xF3\xF4\xF5\xF6\xF7\xF8\xF9\xFA\xFF\xDA\x00\x08\x01\x01\x00\x00\x3F\x00\xFB\xD0\xFF\xD9' > img/team/walter.jpg
cp img/team/walter.jpg img/team/fabrizio.jpg
```

> Note: these placeholders only exist so the layout renders. Real photos land in Task 10.

- [ ] **Step 4: Verify visually**

Reload page. Confirm:
- Eyebrow "Chi siamo" in orange uppercase
- H2 bold and dark navy
- Two team cards side-by-side on desktop, stacked on mobile
- Circular placeholder images (will be real photos after Task 10)
- Bio text left-aligned inside card, role line blue

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css img/team
git commit -m "feat(chi-siamo): add team section with Walter and Fabrizio cards"
```

---

## Task 7: Servizi section (#servizi)

**Files:**
- Modify: `sito/index.html` (append after chi-siamo)
- Modify: `sito/css/style.css` (append)

- [ ] **Step 1: Insert servizi into `index.html`**

```html
<section id="servizi" class="servizi">
  <div class="container">
    <p class="section-eyebrow">Servizi</p>
    <h2>Tre cose. Fatte bene.</h2>
    <p class="section-lede">
      Non facciamo tutto. Facciamo solo quello che sappiamo fare meglio di chiunque altro.
    </p>

    <div class="servizi__grid">
      <article class="servizio-card">
        <div class="servizio-card__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="44" height="44">
            <rect x="8" y="6" width="32" height="36" rx="3" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="14" y1="14" x2="34" y2="14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="24" cy="26" r="2" fill="currentColor"/>
          </svg>
        </div>
        <h3>Box doccia su misura</h3>
        <p>
          Costruiamo box doccia su misura per il tuo bagno, anche in spazi irregolari o piccoli.
          Cristalli di alta qualità, profili eleganti, tenuta garantita nel tempo.
        </p>
      </article>

      <article class="servizio-card">
        <div class="servizio-card__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="44" height="44">
            <rect x="6" y="14" width="36" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="2.5"/>
            <line x1="24" y1="14" x2="24" y2="38" stroke="currentColor" stroke-width="2.5"/>
            <circle cx="16" cy="26" r="1.5" fill="currentColor"/>
            <circle cx="32" cy="26" r="1.5" fill="currentColor"/>
            <path d="M6 14 L12 8 H 36 L 42 14" fill="none" stroke="currentColor" stroke-width="2.5"/>
          </svg>
        </div>
        <h3>Mobili bagno su misura</h3>
        <p>
          Ogni mobile è progettato per il tuo bagno, non per uno standard. Materiali di qualità,
          finiture scelte da te, durata pensata per gli anni — non per le stagioni.
        </p>
      </article>

      <article class="servizio-card">
        <div class="servizio-card__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="44" height="44">
            <path d="M8 40 L 18 30 L 24 36 L 40 18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M30 18 H 40 V 28" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="24" cy="36" r="1.5" fill="currentColor"/>
          </svg>
        </div>
        <h3>Progettazione su misura</h3>
        <p>
          Sopralluogo a casa tua, rilievi precisi, render del progetto e consulenza tecnica.
          Ti seguiamo dalla prima idea all'installazione finita.
        </p>
      </article>
    </div>

    <div class="comparison">
      <h3 class="comparison__title">Perché non siamo un grande magazzino.</h3>
      <div class="comparison__table" role="table">
        <div class="comparison__row comparison__row--head" role="row">
          <div role="columnheader">✗ Grandi distributori</div>
          <div role="columnheader">✓ Vismara Bagni</div>
        </div>
        <div class="comparison__row" role="row">
          <div role="cell">Mobili in scatola, misure standard</div>
          <div role="cell"><strong>Su misura</strong>, anche per spazi difficili</div>
        </div>
        <div class="comparison__row" role="row">
          <div role="cell">Materiali pensati per costare poco</div>
          <div role="cell"><strong>Materiali selezionati</strong> per durare</div>
        </div>
        <div class="comparison__row" role="row">
          <div role="cell">Montaggio fai-da-te o terzista anonimo</div>
          <div role="cell"><strong>Installazione</strong> dei nostri artigiani</div>
        </div>
        <div class="comparison__row" role="row">
          <div role="cell">Assistenza in un call center</div>
          <div role="cell"><strong>Walter e Fabrizio</strong> rispondono di persona</div>
        </div>
        <div class="comparison__row" role="row">
          <div role="cell">Garanzia "fino a quando ci trovi"</div>
          <div role="cell"><strong>45 anni</strong> che siamo qui, in via Unità d'Italia</div>
        </div>
      </div>
    </div>

    <div class="servizi__cta">
      <p>Vuoi capire la differenza? <strong>Vieni in showroom a Paderno Dugnano</strong> o chiedici un sopralluogo gratuito a casa tua.</p>
      <a href="#contatti" class="btn btn--accent">Prenota un sopralluogo gratuito</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* --- Sezione generica --- */
.section-lede {
  max-width: 700px;
  font-size: 1.05rem;
  margin-bottom: var(--sp-6);
}

/* --- Servizi --- */
.servizi { background: var(--c-white); }
.servizi__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--sp-3);
  margin-bottom: var(--sp-8);
}
.servizio-card {
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: var(--sp-4);
  transition: transform 0.18s, box-shadow 0.18s;
}
.servizio-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.servizio-card__icon {
  width: 72px; height: 72px;
  border-radius: 18px;
  background: rgba(42, 123, 192, 0.12);
  color: var(--c-primary);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: var(--sp-3);
}

/* --- Comparison table --- */
.comparison {
  background: var(--c-primary-dark);
  color: var(--c-white);
  border-radius: var(--radius-lg);
  padding: var(--sp-4) var(--sp-4);
  margin-bottom: var(--sp-6);
}
.comparison__title { color: var(--c-white); margin-bottom: var(--sp-4); }
.comparison__table { display: grid; gap: 1px; background: rgba(255,255,255,0.15); border-radius: var(--radius-md); overflow: hidden; }
.comparison__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(255,255,255,0.15); }
.comparison__row > div { background: var(--c-primary-dark); padding: var(--sp-2) var(--sp-3); }
.comparison__row--head > div {
  background: rgba(255,255,255,0.08);
  font-family: var(--ff-display); font-weight: 600;
}
.comparison__row > div:nth-child(1) { opacity: 0.7; }
.comparison__row > div:nth-child(2) { background: rgba(232, 149, 89, 0.18); }

@media (max-width: 640px) {
  .comparison__row { grid-template-columns: 1fr; }
  .comparison__row > div:nth-child(1) { font-size: 0.9rem; }
}

/* --- Servizi CTA --- */
.servizi__cta {
  text-align: center;
  padding: var(--sp-4) var(--sp-3);
  background: rgba(232, 149, 89, 0.08);
  border-radius: var(--radius-lg);
}
.servizi__cta p { margin-bottom: var(--sp-3); font-size: 1.05rem; }
```

- [ ] **Step 3: Verify visually**

Reload page. Confirm:
- 3 service cards in a row on desktop, stacked on mobile
- Icon tiles light blue with darker blue SVG glyph
- Comparison table: 2 columns on desktop with orange-tinted "Vismara" column, single column on mobile
- CTA banner with orange button at bottom of section

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat(servizi): add 3 service cards, comparison table, CTA"
```

---

## Task 8: Lavori section (#lavori) — gallery markup (photos come in Task 11)

**Files:**
- Modify: `sito/index.html` (append after servizi)
- Modify: `sito/css/style.css` (append)

- [ ] **Step 1: Insert lavori into `index.html`**

```html
<section id="lavori" class="lavori">
  <div class="container">
    <p class="section-eyebrow">Lavori</p>
    <h2>I bagni che abbiamo firmato.</h2>
    <p class="section-lede">
      Ogni progetto è diverso, perché ogni cliente lo è. Sfoglia alcuni dei lavori che abbiamo
      realizzato nel nostro showroom e a casa dei nostri clienti.
    </p>

    <ul class="gallery" id="gallery">
      <!-- 12 items, populated for now with placeholder src. Photos arrive in Task 11. -->
      <li class="gallery__item"><button type="button" data-full="img/lavori/01.jpg"><img src="img/lavori/thumb/01.jpg" alt="Bagno realizzato — vista 1" loading="lazy" width="800" height="600"></button></li>
      <li class="gallery__item"><button type="button" data-full="img/lavori/02.jpg"><img src="img/lavori/thumb/02.jpg" alt="Bagno realizzato — vista 2" loading="lazy" width="800" height="600"></button></li>
      <li class="gallery__item"><button type="button" data-full="img/lavori/03.jpg"><img src="img/lavori/thumb/03.jpg" alt="Bagno realizzato — vista 3" loading="lazy" width="800" height="600"></button></li>
      <li class="gallery__item"><button type="button" data-full="img/lavori/04.jpg"><img src="img/lavori/thumb/04.jpg" alt="Bagno realizzato — vista 4" loading="lazy" width="800" height="600"></button></li>
      <li class="gallery__item"><button type="button" data-full="img/lavori/05.jpg"><img src="img/lavori/thumb/05.jpg" alt="Bagno realizzato — vista 5" loading="lazy" width="800" height="600"></button></li>
      <li class="gallery__item"><button type="button" data-full="img/lavori/06.jpg"><img src="img/lavori/thumb/06.jpg" alt="Bagno realizzato — vista 6" loading="lazy" width="800" height="600"></button></li>
      <li class="gallery__item"><button type="button" data-full="img/lavori/07.jpg"><img src="img/lavori/thumb/07.jpg" alt="Bagno realizzato — vista 7" loading="lazy" width="800" height="600"></button></li>
      <li class="gallery__item"><button type="button" data-full="img/lavori/08.jpg"><img src="img/lavori/thumb/08.jpg" alt="Bagno realizzato — vista 8" loading="lazy" width="800" height="600"></button></li>
      <li class="gallery__item"><button type="button" data-full="img/lavori/09.jpg"><img src="img/lavori/thumb/09.jpg" alt="Bagno realizzato — vista 9" loading="lazy" width="800" height="600"></button></li>
      <li class="gallery__item"><button type="button" data-full="img/lavori/10.jpg"><img src="img/lavori/thumb/10.jpg" alt="Bagno realizzato — vista 10" loading="lazy" width="800" height="600"></button></li>
      <li class="gallery__item"><button type="button" data-full="img/lavori/11.jpg"><img src="img/lavori/thumb/11.jpg" alt="Bagno realizzato — vista 11" loading="lazy" width="800" height="600"></button></li>
      <li class="gallery__item"><button type="button" data-full="img/lavori/12.jpg"><img src="img/lavori/thumb/12.jpg" alt="Bagno realizzato — vista 12" loading="lazy" width="800" height="600"></button></li>
    </ul>

    <div class="lavori__cta">
      <a href="#contatti" class="btn btn--accent">Vuoi un bagno così? Richiedi un preventivo</a>
    </div>
  </div>
</section>

<!-- Lightbox: hidden by default, controlled by js/gallery.js -->
<div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-label="Galleria foto">
  <button class="lightbox__close" aria-label="Chiudi">×</button>
  <button class="lightbox__prev" aria-label="Foto precedente">‹</button>
  <img class="lightbox__img" alt="">
  <button class="lightbox__next" aria-label="Foto successiva">›</button>
</div>
<script src="js/gallery.js" defer></script>
```

> The lightbox + script tag belong before `</body>`. Move/keep them adjacent to the existing `<script src="js/nav.js" defer></script>`.

- [ ] **Step 2: Append CSS**

```css
/* --- Lavori gallery --- */
.gallery {
  list-style: none; padding: 0; margin: 0 0 var(--sp-6);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--sp-2);
}
.gallery__item { margin: 0; }
.gallery__item button {
  display: block; width: 100%; padding: 0;
  background: var(--c-border);
  border: 0; border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
}
.gallery__item img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.3s ease;
}
.gallery__item button:hover img { transform: scale(1.05); }
.gallery__item button:focus-visible { outline: 3px solid var(--c-accent); outline-offset: 3px; }

.lavori__cta { text-align: center; }

/* --- Lightbox --- */
.lightbox {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(15, 23, 42, 0.92);
  display: none;
  align-items: center; justify-content: center;
}
.lightbox.is-open { display: flex; }
.lightbox__img { max-width: 92vw; max-height: 86vh; object-fit: contain; }
.lightbox button {
  position: absolute; background: rgba(255,255,255,0.12); color: white;
  border: 0; border-radius: 50%;
  width: 48px; height: 48px; font-size: 1.8rem; line-height: 1;
  display: flex; align-items: center; justify-content: center;
}
.lightbox button:hover { background: rgba(255,255,255,0.25); }
.lightbox__close { top: 16px; right: 16px; }
.lightbox__prev { left: 16px; top: 50%; transform: translateY(-50%); }
.lightbox__next { right: 16px; top: 50%; transform: translateY(-50%); }
@media (max-width: 640px) {
  .lightbox__prev { left: 8px; } .lightbox__next { right: 8px; }
}
```

- [ ] **Step 3: Verify (visual placeholders OK before Task 11)**

Reload page. Confirm:
- Empty/grey tile grid (12 cells) — broken-image icons until Task 11 lands real photos
- Clicking a tile does nothing yet (gallery.js implemented in Task 13)

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat(lavori): add gallery grid markup and lightbox skeleton"
```

---

## Task 9: Recensioni section (#recensioni)

**Files:**
- Modify: `sito/index.html` (append after lavori)
- Modify: `sito/css/style.css` (append)

- [ ] **Step 1: Insert recensioni in `index.html`**

```html
<section id="recensioni" class="recensioni">
  <div class="container">
    <p class="section-eyebrow">Recensioni</p>
    <h2>Le parole dei nostri clienti<br>valgono più delle nostre.</h2>
    <p class="section-lede">
      Su Google abbiamo una media di <strong>4.8 su 5</strong>.
      Ma più dei numeri, contano le persone che ci raccontano com'è andata.
    </p>

    <div class="rating-badge">
      <div class="rating-badge__stars" aria-hidden="true">★★★★★</div>
      <div class="rating-badge__score">4.8 / 5</div>
      <div class="rating-badge__source">media recensioni Google</div>
    </div>

    <div class="reviews">
      <!-- PLACEHOLDER — sostituire con 3-4 recensioni reali copiate da Google Maps -->
      <article class="review">
        <div class="review__stars" aria-label="5 stelle">★★★★★</div>
        <p class="review__text">
          "[Inserire qui una recensione reale copiata da Google. Tono naturale del cliente,
          1–4 frasi. Ricorda di chiedere all'autore se ti va di citarlo con nome completo o solo iniziale.]"
        </p>
        <p class="review__author">— [Nome cliente]</p>
      </article>
      <article class="review">
        <div class="review__stars" aria-label="5 stelle">★★★★★</div>
        <p class="review__text">"[Inserire recensione reale]"</p>
        <p class="review__author">— [Nome cliente]</p>
      </article>
      <article class="review">
        <div class="review__stars" aria-label="5 stelle">★★★★★</div>
        <p class="review__text">"[Inserire recensione reale]"</p>
        <p class="review__author">— [Nome cliente]</p>
      </article>
    </div>

    <p class="reviews__cta">
      <a href="https://www.google.com/maps/search/?api=1&query=Vismara+Bagni+Paderno+Dugnano"
         target="_blank" rel="noopener" class="link-arrow">
        Leggi tutte le recensioni su Google →
      </a>
    </p>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* --- Recensioni --- */
.recensioni { background: var(--c-white); }
.rating-badge {
  text-align: center;
  padding: var(--sp-4) var(--sp-3);
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  max-width: 360px;
  margin: 0 auto var(--sp-6);
}
.rating-badge__stars {
  font-size: 2rem;
  color: var(--c-accent);
  letter-spacing: 4px;
  margin-bottom: var(--sp-1);
}
.rating-badge__score {
  font-family: var(--ff-display);
  font-weight: 700;
  font-size: 2.4rem;
  color: var(--c-primary-dark);
  line-height: 1;
}
.rating-badge__source {
  color: var(--c-text); opacity: 0.7;
  font-size: 0.95rem; margin-top: 0.25rem;
}

.reviews {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--sp-3);
  margin-bottom: var(--sp-4);
}
.review {
  background: var(--c-bg);
  border-radius: var(--radius-lg);
  padding: var(--sp-3);
  border: 1px solid var(--c-border);
}
.review__stars { color: var(--c-accent); letter-spacing: 2px; margin-bottom: var(--sp-1); }
.review__text { font-style: italic; }
.review__author { font-weight: 600; color: var(--c-primary-dark); margin: 0; }

.reviews__cta { text-align: center; }
.link-arrow {
  color: var(--c-primary);
  font-weight: 600;
  border-bottom: 2px solid var(--c-primary);
  padding-bottom: 2px;
}
.link-arrow:hover { color: var(--c-primary-dark); border-bottom-color: var(--c-primary-dark); }
```

- [ ] **Step 3: Verify visually**

Reload. Confirm:
- Central rating badge with orange stars + big "4.8 / 5"
- 3 review cards below, each with stars + italic placeholder text
- Link "Leggi tutte le recensioni su Google →" at bottom

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat(recensioni): add rating badge and review cards (placeholders)"
```

---

## Task 10: Process team photos (walter.jpg + fabrizio.jpg)

**Files:**
- Modify (overwrite): `sito/img/team/walter.jpg`
- Modify (overwrite): `sito/img/team/fabrizio.jpg`
- Source: `C:\Users\ricca\Downloads\Vismara bagni\Team\Foto walter.jpeg` and `foto fabrizio.jpeg`

- [ ] **Step 1: Check ImageMagick availability**

Run: `magick -version`
Expected: prints "Version: ImageMagick 7…". If "command not found", install via `winget install ImageMagick.ImageMagick` or use Pillow fallback (Step 3 alt).

- [ ] **Step 2: Process Walter — center crop square, resize, light enhance**

```bash
# From sito/
magick "../Team/Foto walter.jpeg" \
  -auto-orient -strip \
  -gravity north -crop 80%x80%+0+0 +repage \
  -resize 800x800^ -gravity center -extent 600x600 \
  -modulate 102,108,100 \
  -unsharp 0x0.75+0.75+0.008 \
  -quality 85 \
  img/team/walter.jpg
```

Open the result. If Walter's face is cut off too high or low, rerun without `-gravity north`:

```bash
magick "../Team/Foto walter.jpeg" \
  -auto-orient -strip \
  -resize 800x800^ -gravity center -extent 600x600 \
  -modulate 102,108,100 -unsharp 0x0.75+0.75+0.008 \
  -quality 85 img/team/walter.jpg
```

- [ ] **Step 3: Process Fabrizio (full body shot, need different crop framing)**

```bash
# Fabrizio's source is a full-body portrait; crop to upper portion for circular avatar
magick "../Team/foto fabrizio.jpeg" \
  -auto-orient -strip \
  -gravity north -crop 100%x55%+0+0 +repage \
  -resize 800x800^ -gravity center -extent 600x600 \
  -modulate 102,106,100 \
  -unsharp 0x0.75+0.75+0.008 \
  -quality 85 \
  img/team/fabrizio.jpg
```

- [ ] **Step 3-alt: Pillow fallback if ImageMagick missing**

```python
# scripts/process_team.py — run once, then delete
from PIL import Image, ImageEnhance, ImageOps
from pathlib import Path

SRC = Path(r"C:\Users\ricca\Downloads\Vismara bagni\Team")
DST = Path("img/team")
DST.mkdir(parents=True, exist_ok=True)

def process(name, src_name, crop_top_pct=0):
    img = Image.open(SRC / src_name)
    img = ImageOps.exif_transpose(img)
    w, h = img.size
    if crop_top_pct:
        img = img.crop((0, int(h * crop_top_pct / 100), w, int(h * (crop_top_pct + 55) / 100)))
    img = ImageOps.fit(img, (600, 600), method=Image.LANCZOS, centering=(0.5, 0.4))
    img = ImageEnhance.Color(img).enhance(1.08)
    img = ImageEnhance.Contrast(img).enhance(1.02)
    img.save(DST / name, "JPEG", quality=85, optimize=True)

process("walter.jpg", "Foto walter.jpeg", crop_top_pct=0)
process("fabrizio.jpg", "foto fabrizio.jpeg", crop_top_pct=10)
print("Done")
```

Run: `python scripts/process_team.py`

- [ ] **Step 4: Verify**

Open `img/team/walter.jpg` and `img/team/fabrizio.jpg` directly. Both should be 600x600, faces well framed and centered. Reload site — circular avatars in Chi siamo now show real photos.

- [ ] **Step 5: Commit**

```bash
git add img/team/walter.jpg img/team/fabrizio.jpg
git commit -m "feat(team): add processed photos of Walter and Fabrizio (600x600)"
```

---

## Task 11: Select and process gallery photos (12 of 24)

**Files:**
- Create: `sito/img/lavori/01.jpg` ... `12.jpg`
- Create: `sito/img/lavori/thumb/01.jpg` ... `12.jpg`
- Source: `C:\Users\ricca\Downloads\Vismara bagni\Foto\WhatsApp Image *.jpeg` (24 files)

- [ ] **Step 1: Visually pick the 12 best**

Use the Read tool on each of the 24 source images, write a one-line note about each (composition, lighting, what it shows). Pick 12 with variety: 4–5 full bathroom views, 3–4 vanity/sink details, 2–3 shower details, 1–2 mirror/accessory details. Avoid near-duplicates (multiple WhatsApp images at the same timestamp are likely siblings — pick the best one).

Document chosen 12 in a comment block at the top of `scripts/process_lavori.sh` (or `.py`) so the mapping is reviewable.

- [ ] **Step 2: Batch-process with ImageMagick**

Create `scripts/process_lavori.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

SRC="../Foto"
OUT_FULL="img/lavori"
OUT_THUMB="img/lavori/thumb"

mkdir -p "$OUT_FULL" "$OUT_THUMB"

# Mapping: edit array below to point to the 12 selected source filenames in order.
# (Replace these placeholder filenames with the 12 you picked in Step 1.)
SOURCES=(
  "WhatsApp Image 2026-06-19 at 20.15.22.jpeg"
  "WhatsApp Image 2026-06-19 at 20.15.22 (1).jpeg"
  "WhatsApp Image 2026-06-19 at 20.15.22 (2).jpeg"
  "WhatsApp Image 2026-06-19 at 20.15.22 (3).jpeg"
  "WhatsApp Image 2026-06-19 at 20.15.23.jpeg"
  "WhatsApp Image 2026-06-19 at 20.16.12.jpeg"
  "WhatsApp Image 2026-06-19 at 20.16.41.jpeg"
  "WhatsApp Image 2026-06-19 at 20.17.26.jpeg"
  "WhatsApp Image 2026-06-19 at 20.17.49.jpeg"
  "WhatsApp Image 2026-06-19 at 20.18.09.jpeg"
  "WhatsApp Image 2026-06-19 at 20.18.27.jpeg"
  "WhatsApp Image 2026-06-19 at 20.19.00.jpeg"
)

i=1
for src in "${SOURCES[@]}"; do
  idx=$(printf "%02d" "$i")
  echo "Processing $idx: $src"

  # Full version: max 1600px long edge, quality 82
  magick "$SRC/$src" \
    -auto-orient -strip \
    -resize "1600x1600>" \
    -unsharp 0x0.5+0.5+0.008 \
    -quality 82 \
    "$OUT_FULL/$idx.jpg"

  # Thumb: 800x600 cropped center, quality 80
  magick "$SRC/$src" \
    -auto-orient -strip \
    -resize "800x800^" -gravity center -extent 800x600 \
    -unsharp 0x0.5+0.5+0.008 \
    -quality 80 \
    "$OUT_THUMB/$idx.jpg"

  i=$((i+1))
done

echo "Done — 12 full + 12 thumb generated."
```

Run: `bash scripts/process_lavori.sh`

- [ ] **Step 3: Pillow fallback if needed**

```python
# scripts/process_lavori.py
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path(r"C:\Users\ricca\Downloads\Vismara bagni\Foto")
OUT_FULL = Path("img/lavori")
OUT_THUMB = Path("img/lavori/thumb")
OUT_FULL.mkdir(parents=True, exist_ok=True)
OUT_THUMB.mkdir(parents=True, exist_ok=True)

SOURCES = [
    # 12 filenames, edit to match selection
]

for i, name in enumerate(SOURCES, start=1):
    idx = f"{i:02d}"
    img = ImageOps.exif_transpose(Image.open(SRC / name))
    full = img.copy()
    full.thumbnail((1600, 1600), Image.LANCZOS)
    full.save(OUT_FULL / f"{idx}.jpg", "JPEG", quality=82, optimize=True)
    thumb = ImageOps.fit(img, (800, 600), Image.LANCZOS)
    thumb.save(OUT_THUMB / f"{idx}.jpg", "JPEG", quality=80, optimize=True)

print("Done")
```

- [ ] **Step 4: Update hero background to use img/lavori/01.jpg**

The Task 5 CSS already references `img/lavori/01.jpg`. After this task it resolves — reload to verify the hero now has a real bathroom photo behind the navy overlay.

- [ ] **Step 5: Verify**

Reload site. Confirm:
- Hero has a bathroom photo backdrop (darkened with navy overlay)
- Lavori gallery shows 12 real bathroom photos
- Each thumb loads in under ~150 KB (check DevTools Network)

- [ ] **Step 6: Commit**

```bash
git add img/lavori scripts/process_lavori.sh
git commit -m "feat(lavori): add 12 selected and optimized project photos"
```

---

## Task 12: Contatti section (#contatti)

**Files:**
- Modify: `sito/index.html` (append after recensioni)
- Modify: `sito/css/style.css` (append)

- [ ] **Step 1: Insert contatti into `index.html`**

```html
<section id="contatti" class="contatti">
  <div class="container">
    <p class="section-eyebrow">Contatti</p>
    <h2>Pronti a iniziare? Parlaci del tuo bagno.</h2>
    <p class="section-lede">
      Compila il form per un <strong>preventivo gratuito e senza impegno</strong> oppure
      scrivici o chiamaci direttamente. Risposta entro 24 ore lavorative.
    </p>

    <div class="contatti__grid">
      <form class="preventivo-form"
            name="preventivo"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            netlify>
        <input type="hidden" name="form-name" value="preventivo">
        <p hidden><label>Non compilare: <input name="bot-field"></label></p>

        <div class="form-row">
          <label for="nome">Nome e cognome *</label>
          <input id="nome" name="nome" type="text" required autocomplete="name">
        </div>

        <div class="form-row form-row--split">
          <div>
            <label for="telefono">Telefono *</label>
            <input id="telefono" name="telefono" type="tel" required autocomplete="tel" pattern="[0-9 +()-]{6,}">
          </div>
          <div>
            <label for="email">Email *</label>
            <input id="email" name="email" type="email" required autocomplete="email">
          </div>
        </div>

        <div class="form-row">
          <label for="tipo">Tipo di intervento</label>
          <select id="tipo" name="tipo">
            <option value="">Seleziona…</option>
            <option>Box doccia</option>
            <option>Mobili bagno</option>
            <option>Bagno completo</option>
            <option>Sopralluogo</option>
            <option>Altro</option>
          </select>
        </div>

        <div class="form-row">
          <label for="messaggio">Messaggio</label>
          <textarea id="messaggio" name="messaggio" rows="4" placeholder="Descrivi il tuo progetto, lo spazio, le tue idee…"></textarea>
        </div>

        <div class="form-row form-row--checkbox">
          <label>
            <input type="checkbox" name="privacy" required>
            Ho letto e accetto l'informativa privacy *
          </label>
        </div>

        <button type="submit" class="btn btn--accent">Invia richiesta</button>

        <p class="form-feedback" id="form-feedback" role="status" aria-live="polite"></p>
        <p class="form-fallback">
          Problemi con il form?
          <a href="mailto:vismarasnc@tiscalinet.it?subject=Richiesta preventivo&body=Salve, vorrei…">
            Scrivici via email
          </a>
        </p>
      </form>

      <aside class="contatti-info">
        <ul class="contatti-info__list">
          <li>
            <span aria-hidden="true">📍</span>
            <div>
              <strong>Showroom</strong><br>
              Via Unità d'Italia, 10<br>
              20037 Paderno Dugnano (MI)
            </div>
          </li>
          <li>
            <span aria-hidden="true">☎️</span>
            <div>
              <strong>Telefono</strong><br>
              <a href="tel:+390291822180">02 918 2218</a>
            </div>
          </li>
          <li>
            <span aria-hidden="true">💬</span>
            <div>
              <strong>WhatsApp</strong><br>
              <a href="https://wa.me/393356529601" target="_blank" rel="noopener">+39 335 652 9601</a>
            </div>
          </li>
          <li>
            <span aria-hidden="true">✉️</span>
            <div>
              <strong>Email</strong><br>
              <a href="mailto:vismarasnc@tiscalinet.it">vismarasnc@tiscalinet.it</a>
            </div>
          </li>
          <li>
            <span aria-hidden="true">🕐</span>
            <div>
              <strong>Orari</strong><br>
              <em>Lun–Sab: orari da confermare</em><!-- PLACEHOLDER -->
            </div>
          </li>
        </ul>

        <div class="contatti-info__map">
          <iframe
            title="Mappa Vismara Bagni"
            src="https://www.google.com/maps?q=Via+Unit%C3%A0+d%27Italia+10,+20037+Paderno+Dugnano+MI&output=embed"
            loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen></iframe>
        </div>
      </aside>
    </div>
  </div>
</section>
<script src="js/form.js" defer></script>
```

- [ ] **Step 2: Append CSS**

```css
/* --- Contatti --- */
.contatti__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: var(--sp-6);
}
@media (max-width: 860px) {
  .contatti__grid { grid-template-columns: 1fr; }
}

/* Form */
.preventivo-form {
  background: var(--c-white);
  padding: var(--sp-4);
  border-radius: var(--radius-lg);
  border: 1px solid var(--c-border);
  box-shadow: var(--shadow-sm);
}
.form-row { margin-bottom: var(--sp-3); }
.form-row label { display: block; font-weight: 500; margin-bottom: 0.35rem; color: var(--c-primary-dark); }
.form-row input, .form-row select, .form-row textarea {
  width: 100%; padding: 0.7em 0.9em;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  font: inherit; color: var(--c-text);
  background: var(--c-bg);
  transition: border-color 0.15s, background 0.15s;
}
.form-row input:focus, .form-row select:focus, .form-row textarea:focus {
  outline: none;
  border-color: var(--c-primary);
  background: var(--c-white);
  box-shadow: 0 0 0 3px rgba(42, 123, 192, 0.15);
}
.form-row textarea { resize: vertical; }
.form-row--split { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2); }
@media (max-width: 520px) { .form-row--split { grid-template-columns: 1fr; } }
.form-row--checkbox label { display: flex; align-items: center; gap: var(--sp-1); font-weight: 400; }

.form-feedback {
  margin-top: var(--sp-2); font-weight: 600; min-height: 1.4em;
}
.form-feedback.is-success { color: var(--c-success); }
.form-feedback.is-error { color: var(--c-error); }

.form-fallback {
  margin-top: var(--sp-2); font-size: 0.9rem; color: var(--c-text); opacity: 0.8;
}
.form-fallback a { color: var(--c-primary); text-decoration: underline; }

/* Info */
.contatti-info__list {
  list-style: none; padding: 0; margin: 0 0 var(--sp-3);
  display: grid; gap: var(--sp-2);
}
.contatti-info__list li { display: flex; gap: var(--sp-2); align-items: flex-start; }
.contatti-info__list li span { font-size: 1.4rem; line-height: 1.4; }
.contatti-info__list a { color: var(--c-primary); }
.contatti-info__list a:hover { color: var(--c-primary-dark); text-decoration: underline; }

.contatti-info__map {
  margin-top: var(--sp-3);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--c-border);
}
.contatti-info__map iframe {
  width: 100%; height: 280px; border: 0; display: block;
}
```

- [ ] **Step 3: Add Netlify forms detection HTML stub**

For Netlify to detect the form during build, add an empty static counterpart with the same `name` and fields. Append this to `index.html` just before `</body>` (hidden):

```html
<!-- Netlify form-detection (build-time) -->
<form name="preventivo" netlify netlify-honeypot="bot-field" hidden>
  <input type="text" name="nome">
  <input type="tel" name="telefono">
  <input type="email" name="email">
  <select name="tipo">
    <option>Box doccia</option><option>Mobili bagno</option>
    <option>Bagno completo</option><option>Sopralluogo</option><option>Altro</option>
  </select>
  <textarea name="messaggio"></textarea>
  <input type="checkbox" name="privacy">
</form>
```

- [ ] **Step 4: Verify**

Reload page. Confirm:
- Form on left with all fields and orange Submit button
- Right column: 5 info rows (showroom, telefono, WhatsApp, email, orari) + Google Maps iframe of Paderno Dugnano
- Submit currently doesn't do anything visible — form.js implements feedback in Task 14
- Mobile: form + info stack vertically

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "feat(contatti): add form, info column, embedded map, netlify form stub"
```

---

## Task 13: Footer

**Files:**
- Modify: `sito/index.html` (insert after `</main>`, before WhatsApp FAB)
- Modify: `sito/css/style.css` (append)

- [ ] **Step 1: Insert footer**

```html
<footer class="site-footer">
  <div class="container site-footer__inner">
    <div class="site-footer__col">
      <img src="img/logo.svg" alt="Vismara Bagni" height="44">
      <p>45 anni di artigianato.<br>Lo showroom dei bagni su misura a Paderno Dugnano (MI).</p>
    </div>
    <div class="site-footer__col">
      <h4>Naviga</h4>
      <ul>
        <li><a href="#chi-siamo">Chi siamo</a></li>
        <li><a href="#servizi">Servizi</a></li>
        <li><a href="#lavori">Lavori</a></li>
        <li><a href="#recensioni">Recensioni</a></li>
        <li><a href="#contatti">Contatti</a></li>
      </ul>
    </div>
    <div class="site-footer__col">
      <h4>Contatti</h4>
      <address>
        Via Unità d'Italia, 10<br>
        20037 Paderno Dugnano (MI)<br>
        ☎ <a href="tel:+390291822180">02 918 2218</a><br>
        💬 <a href="https://wa.me/393356529601" target="_blank" rel="noopener">+39 335 652 9601</a><br>
        ✉ <a href="mailto:vismarasnc@tiscalinet.it">vismarasnc@tiscalinet.it</a>
      </address>
    </div>
  </div>
  <div class="site-footer__legal">
    <div class="container">
      © 2026 Vismara Bagni snc di Vismara Giovanni Walter Fabrizio
      · P.IVA <span class="placeholder">[da inserire]</span>
      · <a href="#">Privacy</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Append CSS**

```css
/* --- Footer --- */
.site-footer {
  background: var(--c-primary-dark);
  color: rgba(255, 255, 255, 0.85);
  margin-top: var(--sp-8);
}
.site-footer__inner {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.3fr;
  gap: var(--sp-4);
  padding: var(--sp-6) 0;
}
.site-footer img { filter: brightness(0) invert(1); height: 44px; margin-bottom: var(--sp-2); }
.site-footer h4 { color: var(--c-white); font-family: var(--ff-display); font-size: 1rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: var(--sp-2); }
.site-footer ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.4rem; }
.site-footer a { color: rgba(255,255,255,0.85); }
.site-footer a:hover { color: var(--c-accent); }
.site-footer address { font-style: normal; line-height: 1.7; }
.site-footer__legal {
  background: rgba(0,0,0,0.2);
  padding: var(--sp-2) 0;
  font-size: 0.85rem;
  text-align: center;
}
.placeholder { opacity: 0.6; font-style: italic; }
@media (max-width: 720px) {
  .site-footer__inner { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Verify**

Reload. Footer shows: white logo + tagline, nav links column, contacts column. Legal bar at the very bottom.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat(footer): add 3-column footer + legal bar"
```

---

## Task 14: Navigation JS — hamburger + smooth scroll + scroll spy

**Files:**
- Modify: `sito/js/nav.js`

- [ ] **Step 1: Define expected visible behavior**

- Click hamburger on mobile → menu slides in from right
- Click a nav link → menu closes + page scrolls smoothly to the target section
- Scrolling the page → the nav link of the section currently in view gets `.is-active` class
- ESC closes the open menu

- [ ] **Step 2: Implement `js/nav.js`**

```js
// js/nav.js — sticky nav helpers
(() => {
  const nav = document.querySelector(".site-nav");
  const toggle = nav?.querySelector(".site-nav__toggle");
  const list = nav?.querySelector(".site-nav__list");
  const links = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];

  if (!nav || !toggle || !list) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) setOpen(false);
  });

  links.forEach(a => a.addEventListener("click", () => {
    if (nav.classList.contains("is-open")) setOpen(false);
  }));

  // --- Scroll spy ---
  const sectionIds = links
    .map(a => a.getAttribute("href"))
    .filter(h => h && h.startsWith("#") && h.length > 1)
    .map(h => h.slice(1));

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const linkById = Object.fromEntries(
    links.map(a => [a.getAttribute("href").slice(1), a])
  );

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const a = linkById[entry.target.id];
        if (!a) return;
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove("is-active"));
          a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

    sections.forEach(s => observer.observe(s));
  }
})();
```

- [ ] **Step 3: Verify**

Reload site:
- Resize to <860px wide → click hamburger, menu slides in from right, links visible, click a link, menu closes and page scrolls smoothly.
- ESC closes menu when open.
- On desktop: scroll the page slowly, watch nav — the active link updates as each section reaches center of viewport (blue underline on active item).

- [ ] **Step 4: Commit**

```bash
git add js/nav.js
git commit -m "feat(nav): hamburger toggle, smooth scroll, scroll-spy active state"
```

---

## Task 15: Gallery lightbox JS

**Files:**
- Modify: `sito/js/gallery.js`

- [ ] **Step 1: Expected behavior**

- Click any thumbnail → lightbox opens with the corresponding full-size image
- Arrow keys ← → navigate prev/next
- ESC closes
- Click outside the image (on backdrop) closes
- Body scroll locked while open

- [ ] **Step 2: Implement `js/gallery.js`**

```js
// js/gallery.js — lightbox for #lavori
(() => {
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  if (!gallery || !lightbox) return;

  const img = lightbox.querySelector(".lightbox__img");
  const btnClose = lightbox.querySelector(".lightbox__close");
  const btnPrev = lightbox.querySelector(".lightbox__prev");
  const btnNext = lightbox.querySelector(".lightbox__next");

  const triggers = Array.from(gallery.querySelectorAll("button[data-full]"));
  const fulls = triggers.map(b => ({
    src: b.dataset.full,
    alt: b.querySelector("img")?.alt || ""
  }));
  let index = 0;

  function open(i) {
    index = (i + fulls.length) % fulls.length;
    img.src = fulls[index].src;
    img.alt = fulls[index].alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    img.src = "";
    document.body.style.overflow = "";
  }
  const prev = () => open(index - 1);
  const next = () => open(index + 1);

  triggers.forEach((btn, i) => btn.addEventListener("click", () => open(i)));
  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();
```

- [ ] **Step 3: Verify**

Reload. Click thumbnail #1 → full image appears. Press right arrow → image 2. Click backdrop → closes. Press ESC after re-opening → closes. Open on mobile → close/prev/next buttons still tappable, image fits viewport.

- [ ] **Step 4: Commit**

```bash
git add js/gallery.js
git commit -m "feat(gallery): lightbox with keyboard nav + backdrop close"
```

---

## Task 16: Form JS — validation feedback + submit handling

**Files:**
- Modify: `sito/js/form.js`

- [ ] **Step 1: Expected behavior**

- Submit valid form → inline green success message ("✓ Richiesta inviata! Ti risponderemo entro 24 ore lavorative."), form resets
- Submit on network error → inline red error message + suggestion to email
- Native HTML5 validation handles required/email/tel constraints

- [ ] **Step 2: Implement `js/form.js`**

```js
// js/form.js — preventivo form submit handler
(() => {
  const form = document.querySelector(".preventivo-form");
  const feedback = document.getElementById("form-feedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.className = "form-feedback";
    feedback.textContent = "Invio in corso…";

    try {
      const data = new FormData(form);
      const body = new URLSearchParams();
      for (const [k, v] of data.entries()) body.append(k, v);

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });

      if (res.ok || res.status === 200 || res.status === 0) {
        feedback.textContent = "✓ Richiesta inviata! Ti risponderemo entro 24 ore lavorative.";
        feedback.className = "form-feedback is-success";
        form.reset();
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.error("Form error:", err);
      feedback.innerHTML =
        "✗ Si è verificato un problema. Riprova o " +
        '<a href="mailto:vismarasnc@tiscalinet.it">scrivici via email</a>.';
      feedback.className = "form-feedback is-error";
    }
  });
})();
```

- [ ] **Step 3: Verify**

Locally (without Netlify), submitting the form will hit a 404 because the local `python -m http.server` won't accept POST. To exercise the success path locally, temporarily edit `js/form.js` to short-circuit:

```js
// TEMP for local test
feedback.textContent = "✓ Richiesta inviata! Ti risponderemo entro 24 ore lavorative.";
feedback.className = "form-feedback is-success";
form.reset();
return;
```

Confirm:
- Fill form, click submit → green success message shows + form fields clear
- Revert the temp change before commit
- Validation: leave Nome empty + submit → browser shows native required tooltip

- [ ] **Step 4: Commit**

```bash
git add js/form.js
git commit -m "feat(form): async submit with success/error feedback"
```

---

## Task 17: Mobile responsive sweep + accessibility check

**Files:**
- Modify: `sito/css/style.css` (only if issues found)
- Modify: `sito/index.html` (only if issues found)

- [ ] **Step 1: Browser DevTools sweep**

Open Chrome DevTools, toggle device toolbar. Test at: iPhone SE (375x667), iPhone 12 Pro (390x844), iPad (768x1024), 1280, 1920. For each:
- Header readable, hamburger works at <860px
- No horizontal scroll
- Hero text doesn't overflow
- Team cards stack at <720px
- Comparison table collapses at <640px
- Gallery: 2 cols mobile, 3-4 cols desktop
- Form usable, fields large enough to tap
- Footer columns stack on mobile
- WhatsApp FAB doesn't overlap CTA buttons

- [ ] **Step 2: Lighthouse audit**

Run Chrome DevTools → Lighthouse → Mobile + Desktop. Target:
- Performance > 90
- Accessibility > 95
- Best Practices > 90
- SEO > 90

Fix any flagged issues (likely: missing `lang` (already set `it`), color contrast on accent button — bump to `#D87738` if AAA needed, alt text missing — fix in HTML).

- [ ] **Step 3: Keyboard navigation pass**

Tab through the entire page. Confirm:
- Every interactive element has visible focus outline
- Skip links not required for a one-page site but tab order should follow visual order
- ESC closes lightbox and mobile menu
- Form fully fillable by keyboard

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix(a11y): responsive sweep + lighthouse fixes"
```

---

## Task 18: Push to GitHub

**Files:**
- No file changes; remote setup only.

- [ ] **Step 1: Confirm GitHub CLI installed**

Run: `gh --version`
Expected: prints version. If missing: install via `winget install GitHub.cli` and run `gh auth login`.

- [ ] **Step 2: Confirm user has a GitHub account**

If yes, run `gh auth status`. If not logged in, run `gh auth login` and follow the device-code flow in browser.

> ⚠ If user has no GitHub account: pause and ask them to create one at https://github.com/signup, then return.

- [ ] **Step 3: Create remote repo and push**

```bash
# from sito/
gh repo create vismara-bagni-sito --public --source=. --description "Sito vetrina Vismara Bagni — Paderno Dugnano" --push
```

Expected: prints "https://github.com/<user>/vismara-bagni-sito" and pushes `main`.

- [ ] **Step 4: Verify on web**

Open the printed URL. Confirm files present and recent commits visible.

---

## Task 19: Deploy to Netlify

**Files:**
- No file changes; UI setup.

- [ ] **Step 1: Sign in to Netlify**

Go to https://app.netlify.com, log in with GitHub (free tier).

- [ ] **Step 2: Import the repo**

Click "Add new site" → "Import an existing project" → "Deploy with GitHub" → authorize → select `vismara-bagni-sito`.

- [ ] **Step 3: Configure build (none needed)**

Build command: leave empty.
Publish directory: `.` (already set by `netlify.toml`).
Click "Deploy site".

- [ ] **Step 4: Configure form notifications**

After first deploy:
- Netlify dashboard → Forms tab → confirm `preventivo` form detected
- Forms → Settings → Notifications → Add notification → Email notification → recipient: `vismarasnc@tiscalinet.it` → save

- [ ] **Step 5: Test the live form**

Open the live URL (e.g. `vismara-bagni-sito.netlify.app`). Fill the form with test data, submit. Confirm:
- Green success message appears
- Submission shows in Netlify Forms dashboard
- Email arrives at `vismarasnc@tiscalinet.it` within ~1 min

- [ ] **Step 6: Rename site (optional)**

Netlify → Site settings → Change site name → e.g. `vismara-bagni` → URL becomes `vismara-bagni.netlify.app`.

---

## Task 20: Final verification + handover note

**Files:**
- Modify: `sito/README.md`

- [ ] **Step 1: Final smoke test on production URL**

- Site loads in <3 seconds on 4G
- All sections scroll to correctly
- All photos display
- Form submission works end-to-end
- WhatsApp FAB opens chat
- Phone, email, map links all work
- Lighthouse on production URL passes targets

- [ ] **Step 2: Update README with handover info**

```markdown
# Vismara Bagni — sito web

Sito vetrina one-page di Vismara Bagni snc (Paderno Dugnano, MI).

🌐 **Live**: https://vismara-bagni.netlify.app

## Cosa fare per modificare contenuti

| Cosa | Dove |
|---|---|
| Cambiare testi | `index.html` |
| Cambiare stili | `css/style.css` |
| Sostituire foto team | `img/team/walter.jpg`, `fabrizio.jpg` (600x600 JPEG) |
| Aggiungere foto lavori | `img/lavori/13.jpg` + `img/lavori/thumb/13.jpg`, poi aggiungere `<li>` in `index.html` |
| Aggiornare recensioni | sezione `<section id="recensioni">` in `index.html` |
| Cambiare orari/P.IVA | cercare "PLACEHOLDER" o "da inserire" in `index.html` |

## Placeholder ancora da completare

- [ ] Orari settimanali completi (cercare "orari da confermare")
- [ ] P.IVA (cercare "[da inserire]")
- [ ] Recensioni reali (3 placeholder nella sezione recensioni)
- [ ] Pagina privacy (link nel footer è `#`)

## Sviluppo locale

```bash
cd sito
python -m http.server 8000
# apri http://localhost:8000
```

## Deploy

Ogni `git push` su `main` → Netlify rilascia in ~30 secondi.

## Form preventivo

Gestito da Netlify Forms. Le richieste arrivano a `vismarasnc@tiscalinet.it`
e sono consultabili nella dashboard Netlify (sezione Forms).
```

- [ ] **Step 3: Final commit + push**

```bash
git add README.md
git commit -m "docs: finalize README with handover notes"
git push
```

- [ ] **Step 4: Done**

Report to user with:
- Live URL
- GitHub repo URL
- Netlify dashboard URL
- List of pending placeholders requiring info from them
