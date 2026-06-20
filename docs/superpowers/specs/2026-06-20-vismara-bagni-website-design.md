# Vismara Bagni — Sito Web Vetrina

**Data**: 2026-06-20
**Cliente**: Vismara Bagni snc di Vismara Giovanni Walter Fabrizio
**Target utenti**: clientela "normale" e anche matura → priorità a semplicità, leggibilità, intuitività
**Obiettivo del sito**: generare richieste di preventivo / sopralluogo e raccontare il posizionamento artigianale

---

## 1. Posizionamento

Differenziarsi nettamente dai grandi distributori (IKEA & co.) puntando su:

- Lavoro **artigianale** su misura
- **45 anni di esperienza** di Walter e Fabrizio
- Showroom fisico a Paderno Dugnano
- Materiali di qualità, installazione fatta in casa, assistenza personale

Tono: caldo, professionale, rassicurante. Mai aggressivo. Mai gergale.

---

## 2. Identità visiva

### Palette colori

| Ruolo | Hex |
|---|---|
| Primario (blu Vismara) | `#2A7BC0` |
| Primario scuro | `#0F3D6E` |
| Accento (CTA) | `#E89559` |
| Sfondo chiaro | `#FAFAFA` |
| Testo corpo | `#4A4A4A` |
| Bordi | `#E5E7EB` |

### Tipografia

- Titoli: **Poppins** semibold
- Corpo: **Inter** regular
- Base 17px (leggibilità per utenti maturi)

### Logo

Ricreato da zero in SVG basandosi sullo screenshot Google Maps fornito.

- `logo.svg` — versione completa per header/footer
- `favicon.svg` — versione ridotta per scheda browser

### Stile generale

- Pulito, ariosa, spaziature generose
- Bottoni grandi e arrotondati
- Animazioni minime (fade morbidi all'ingresso sezioni)
- **Mobile-first**

---

## 3. Architettura: one-page con 6 sezioni

Sito **single page** (`index.html`) con anchor link e scroll smooth.

```
#home          → Hero
#chi-siamo     → Walter + Fabrizio + storia
#servizi       → 3 servizi core + tabella anti-distributori
#lavori        → Galleria 12 foto con lightbox
#recensioni    → Media 4.8/5 + 3-4 recensioni
#contatti      → Form preventivo + info + mappa
```

### Header sticky

- Sinistra: logo SVG → scroll a `#home`
- Destra (desktop): menu con 5 voci `Chi siamo · Servizi · Lavori · Recensioni · Contatti`
- Estrema destra: bottone arancio **"Preventivo gratuito"** → scroll a `#contatti`
- Mobile: hamburger → overlay full-screen
- **Scroll spy**: voce attiva evidenziata in blu mentre si scrolla

### CTA WhatsApp fluttuante

Bollino verde in basso a destra, sempre visibile.
Apre `https://wa.me/393356529601` con messaggio precompilato.

---

## 4. Contenuti per sezione

### 4.1 Hero (#home)

**Sfondo**: foto bagno dei lavori con overlay blu navy semi-trasparente.

**Copy**:
> # Il bagno che hai in mente, fatto su misura per te.
>
> **45 anni di esperienza artigiana** al servizio del tuo progetto.
> Non vendiamo mobili in scatola: progettiamo, costruiamo e installiamo ogni bagno **su misura**, per durare nel tempo e per essere **esattamente come lo vuoi tu**.
>
> [Richiedi un preventivo gratuito] [Scopri i nostri lavori]
>
> ⭐ 4.8/5 su Google · 📍 Paderno Dugnano (MI) · 🛠 45 anni di artigianato

### 4.2 Chi siamo (#chi-siamo)

**Copy intro**:
> ## Due fratelli, un mestiere: il bagno fatto come si deve.
>
> Vismara Bagni è la storia di **Walter e Fabrizio Vismara**, due fratelli che da oltre 45 anni hanno scelto di fare le cose in un solo modo: **bene**. Niente cataloghi standard, niente soluzioni preconfezionate. Ogni bagno che firmiamo nasce dall'ascolto del cliente, dal sopralluogo a casa sua, e dal lavoro artigiano del nostro showroom di Paderno Dugnano.
>
> In un mondo di grandi distributori, abbiamo scelto di restare **artigiani**. Perché un bagno non è un mobile da assemblare: è uno spazio che userai ogni giorno per vent'anni.

**Card Walter** (foto + testo):
> **Walter Vismara** — Titolare · Area commerciale
> Il primo volto che incontri varcando la porta del nostro showroom. Ascolta le tue esigenze, ti guida nella scelta dei materiali e ti accompagna passo passo fino alla consegna. 45 anni di esperienza per capire al volo cosa serve davvero a chi ha di fronte.

**Card Fabrizio** (foto + testo):
> **Fabrizio Vismara** — Titolare · Area tecnica
> La mente dietro ogni progetto. Si occupa dei rilievi, della progettazione su misura e della scelta dei materiali più adatti al tuo bagno. Trasforma vincoli di spazio in soluzioni eleganti che funzionano davvero.

### 4.3 Servizi (#servizi)

**3 card grandi affiancate**:

1. **Box doccia su misura** — Costruiamo box doccia su misura per il tuo bagno, anche in spazi irregolari o piccoli. Cristalli di alta qualità, profili eleganti, tenuta garantita nel tempo.
2. **Mobili bagno su misura** — Ogni mobile è progettato per il tuo bagno, non per uno standard. Materiali di qualità, finiture scelte da te, durata pensata per gli anni — non per le stagioni.
3. **Progettazione su misura** — Sopralluogo a casa tua, rilievi precisi, render del progetto e consulenza tecnica. Ti seguiamo dalla prima idea all'installazione finita.

**Blocco "Perché non siamo un grande magazzino"** — tabella comparativa:

| ✗ Grandi distributori | ✓ Vismara Bagni |
|---|---|
| Mobili in scatola, misure standard | Su misura, anche per spazi difficili |
| Materiali pensati per costare poco | Materiali selezionati per durare |
| Montaggio fai-da-te o terzista anonimo | Installazione dei nostri artigiani |
| Assistenza in un call center | Walter e Fabrizio rispondono di persona |
| Garanzia "fino a quando ci trovi" | 45 anni che siamo qui, in via Unità d'Italia |

**Chiusura**:
> Vuoi capire la differenza? **Vieni in showroom a Paderno Dugnano** o chiedici un sopralluogo gratuito a casa tua.
> [Prenota un sopralluogo gratuito]

### 4.4 Lavori (#lavori)

- Griglia masonry di **12 foto** selezionate dalle 24 fornite
- Click foto → **lightbox** full-screen con frecce e ESC
- Lazy loading immagini
- Mobile: 2 colonne. Desktop: 3-4 colonne.

**Intro**:
> ## I bagni che abbiamo firmato.
>
> Ogni progetto è diverso, perché ogni cliente lo è. Sfoglia alcuni dei lavori che abbiamo realizzato nel nostro showroom e a casa dei nostri clienti.

**Bottone in fondo**:
> [Vuoi un bagno così? Richiedi un preventivo]

### 4.5 Recensioni (#recensioni)

**Layout**: badge centrale grande "⭐⭐⭐⭐⭐ 4.8/5 su Google" + 3-4 card recensioni.

**Intro**:
> ## Le parole dei nostri clienti valgono più delle nostre.
>
> Su Google abbiamo una media di **4.8 su 5**. Ma più dei numeri, contano le persone che ci raccontano com'è andata.

**Recensioni**: PLACEHOLDER da sostituire con recensioni reali copiate da Google Maps.

**CTA**: link al profilo Google Maps di Vismara Bagni.

### 4.6 Contatti (#contatti)

**Layout 2 colonne** (stack su mobile):

**Colonna sinistra — Form preventivo (Netlify Forms):**
- Nome e cognome *
- Telefono *
- Email *
- Tipo di intervento (select: Box doccia / Mobili bagno / Bagno completo / Sopralluogo / Altro)
- Messaggio (libero, opzionale)
- Checkbox privacy *
- Bottone "Invia richiesta"

**Conferma submit**: messaggio verde inline "✓ Richiesta inviata! Ti risponderemo entro 24 ore lavorative."

**Fallback**: link "Scrivici via email" → `mailto:vismarasnc@tiscalinet.it`.

**Colonna destra — Info contatti**:
- 📍 Via Unità d'Italia, 10 — 20037 Paderno Dugnano (MI)
- ☎ 02 918 2218
- 💬 +39 335 652 9601 (WhatsApp)
- ✉ vismarasnc@tiscalinet.it
- 🕐 Orari: PLACEHOLDER (da fornire)
- **Mappa Google embed** dell'indirizzo

### 4.7 Footer

3 colonne (stack mobile):
- **Col 1**: Logo + frase "45 anni di artigianato"
- **Col 2 (Naviga)**: Chi siamo, Servizi, Lavori, Recensioni, Contatti
- **Col 3 (Contatti)**: indirizzo, telefono, WhatsApp, email

**Riga finale**:
> © 2026 Vismara Bagni snc · P.IVA [PLACEHOLDER] · Privacy

---

## 5. Stack tecnico

- **HTML5 + CSS3 + JavaScript vanilla** — niente framework, niente build step
- File totali < 15, peso totale sito < 2 MB
- Compatibile con tutti i browser moderni (Chrome, Firefox, Safari, Edge — ultimi 2 anni)
- Lighthouse target: **Performance > 90, Accessibility > 95**

### Struttura file

```
sito/
├── index.html
├── css/style.css
├── js/
│   ├── nav.js          # menu hamburger + scroll spy + smooth scroll
│   ├── gallery.js      # lightbox foto
│   └── form.js         # validazione + conferma invio
├── img/
│   ├── logo.svg
│   ├── favicon.svg
│   ├── team/{walter,fabrizio}.jpg
│   └── lavori/01-12.jpg + thumb/01-12.jpg
├── netlify.toml
└── README.md
```

### Form: Netlify Forms

- Attributo `netlify` sul `<form>`
- Honeypot anti-bot
- 100 invii/mese gratis
- Invio email automatico a `vismarasnc@tiscalinet.it`

---

## 6. Pipeline asset

### Logo
Disegnato direttamente in SVG (codice testuale) usando palette ufficiale.

### Foto team
ImageMagick (fallback Python+Pillow) per:
- Crop quadrato 600x600
- Correzione luce/contrasto
- Sfondo uniforme

Output: `walter.jpg`, `fabrizio.jpg`.

### Foto lavori
1. Selezione manuale 12 migliori dalle 24 disponibili (varietà, illuminazione, composizione)
2. Resize max 1600px lato lungo, JPEG quality 82
3. Thumbnail 800px per griglia
4. Lazy loading inline

---

## 7. Deploy

1. `git init` in `sito/`
2. Push su GitHub (repo nuovo)
3. Netlify → Import from GitHub → deploy automatico ad ogni push
4. URL provvisorio: `vismara-bagni.netlify.app`
5. Possibilità futura: collegare dominio `.it` custom

---

## 8. Placeholder da completare a sito attivo

Da raccogliere e sostituire prima della messa online definitiva:

- **Orari completi della settimana** (al momento solo "apre alle 14:30")
- **P.IVA** della snc
- **Recensioni Google reali** (copiate da Google Maps)
- **URL profilo Google Maps** per link "Leggi tutte le recensioni"
- **Eventuale email diversa** se `vismarasnc@tiscalinet.it` non è quella commerciale
- **Pagina Privacy** (testo legale)

---

## 9. Cosa serve dall'utente per il deploy

- Account GitHub (creazione guidata se assente)
- Account Netlify (gratuito, login con GitHub)
- Conferma dei placeholder sopra (può avvenire anche dopo prima messa online)
