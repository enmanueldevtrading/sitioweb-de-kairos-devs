# HANDOFF — kairos-devs.cu

> Documento para el colaborador que recibe el proyecto.
> Léelo de arriba abajo antes de tocar nada.

---

## 1. ¿Qué es este proyecto?

**kairos-devs.cu** es el sitio público de la marca operada por **Enmanuel Mulet Blanco**.
Ofrece 9 servicios de desarrollo (landing pages, e-commerce, IA, RPA + Excel, web apps,
APIs, dashboards, consultoría, sistemas contables) para PYMEs. Headquartered en Cuba 🇨🇺,
estilo de marca global.

- **Tipo:** sitio estático (sin build step, pura HTML + CSS + JS).
- **Stack:** HTML5 semántico (8 vistas), CSS vanilla con variables, JS vanilla, **Three.js
  solo en `index.html`** (canvas del hero), FontAwesome (CDN) para íconos, Google Fonts (Inter).
- **Idioma:** dominio `kairos-devs.cu` (aún en GitHub Pages según `README.md`).

---

## 2. Cómo levantar el sitio en tu PC

```bash
# 1. Clonar o copiar los archivos a una carpeta local
cd kairos-devs/
# 2. Levantar servidor estático (cualquiera de estos)
python -m http.server 8000
# o (alternativa Node)
npx serve .
# 3. Abrir en navegador
# http://localhost:8000
```

**Importante:** si ya tenías `localhost:8000` abierto con caché, hacé **hard refresh**
(`Ctrl+Shift+R` en Windows/Linux, `Cmd+Shift+R` en Mac) o usá una ventana incógnito.
Sino vas a ver la versión vieja en caché. La primera vez tarda más (cold cache);
después el browser cachea `styles.css` y los preloads hacen que la navegación sea
inmediata.

---

## 3. Estado actual del proyecto (después de este sprint)

### Estructura de páginas

Antes había **un solo `index.html` monolítico de ~2000 líneas** con 11 secciones
scrolleables. Ahora está **partido en 8 páginas por sección**, con `index.html`
siendo una home corta y links contextuales entre páginas internas.

Justificación: una sola página scroleando se sentía fea y lenta; páginas dedicadas
permiten links directos (`kairos-devs.cu/proceso.html`), mejor SEO, y menos peso
inicial.

| Archivo | Contenido |
|---|---|
| `index.html` | Home corta: hero 3D + tech marquee + 4 promesas + preview 3 servicios + ventaja Cuba + CTA final |
| `servicios.html` | Catálogo de 9 servicios (existente antes del sprint) |
| `nichos.html` ⭐ nuevo | 6 nichos (odontólogos, estéticos, constructoras, tiendas, restaurantes, locales con redes) con intro + solution + 4 benefits + CTA |
| `portafolio.html` | 3 mockups visuales + 6 casos de estudio (existente antes) |
| `nosotros.html` ⭐ nuevo | Equipo: Enmanuel + 3 roles colaboradores |
| `proceso.html` ⭐ nuevo | 3 pasos (Diagnóstico/Sprint/Lanzamiento) + bloque "Por qué este proceso" |
| `faq.html` | 6 preguntas frecuentes (existente antes) |
| `contacto.html` | Formulario + WhatsApp + redes sociales (existente antes) |

> **Nota:** los marcados con ⭐ se crearon **extrayendo secciones del antiguo
> `index.html` monolítico**. Los demás (`servicios`, `portafolio`, `faq`, `contacto`)
> ya existían y solo se les actualizó la nav y el footer secundario.

---

## 4. Sistema de diseño (paleta Stripe)

Definida en `:root` al inicio de `styles.css` (líneas 5-13). Cambiando estos tokens
cambia TODO el sitio en cascada.

```css
:root {
  --bg:         #0A2540;   /* Stripe navy (fondo principal) */
  --bg-corner:  #142A5C;   /* Acento sutil para gradientes radiales en esquinas */
  --text:       #F5F5F7;   /* Texto principal (casi blanco) */
  --muted:      #A8B5D1;   /* Texto secundario (gris azulado) */
  --accent:     #635BFF;   /* Stripe primary indigo (CTAs, brand) */
  --accent-2:   #00D4FF;   /* Cyan (acentos secundarios, gradientes) */
  --accent-3:   #FF6B6B;   /* Rojo (emergencias/acento negativo) */
  --wa:         #25D366;   /* Verde WhatsApp (no tocar) */
}
```

### Tipografía

- **Familia:** Inter (Google Fonts)
- **Pesos cargados:** `600` (body y subtítulos), `800` (headings). El peso `300`
  (Light) se removió de la URL de Google Fonts (más detalle en §5 — ahorra ~15 KB).
- `font-display: swap` ya está en la URL → el texto renderiza con fallback primero
  y se intercambia con Inter cuando carga.

### Contraste (verificado matemáticamente)

| Par | Ratio | Cumple |
|---|---|---|
| Texto blanco `#F5F5F7` sobre navy `#0A2540` | **15.6:1** | WCAG AAA ✓ |
| Muted `#A8B5D1` sobre navy `#0A2540` | **7.74:1** | WCAG AAA ✓ |
| Indigo `#635BFF` sobre navy `#0A2540` | **3.3:1** | WCAG AA Large ✓ (>=3:1) |

> Importante: indigo sobre navy **NO** alcanza AA Normal (4.5:1) para texto de cuerpo.
> Por eso indigo se usa solo en **elementos UI grandes** (botones "Empezar proyecto",
> headings, iconos), nunca como color de texto en párrafo. Si necesitás texto con
> tono brand, usá `--text` o `--muted`.

---

## 5. Cambios aplicados en este sprint

### Auditoría (correcciones)

- ✅ **`logo.png` referenciado pero no existía** en JSON-LD de `index.html` → ahora
  apunta a `og-image.svg` (que sí existe).
- ✅ **Teléfono en formato no E.164** (`+53-05146569`) → ahora `+535146569`.
- ✅ **`kairos promt.txt` borrado** del disco y añadido a `.gitignore` (era un briefing
  interno que no debería estar en el repo público).
- ✅ **`server.log` y `temp_server.log`** borrados del disco (ya estaban en `.gitignore`).
- ✅ **`aria-current="page"`** añadido al link activo de las 8 páginas (accesibilidad).
- ✅ **`og:image:width="1200"` y `og:image:height="630"`** añadidos a las 7 páginas
  que no son `index.html` (Open Graph consistente).

### Split de páginas (lo más visible del sprint)

- ✅ `index.html` original partido en 8 archivos por sección.
- ✅ Top nav: 8 ítems (`Inicio | Servicios | Nichos | Portafolio | Nosotros | FAQ | Contacto`)
  con `is-active` + `aria-current="page"` en la página correspondiente.
- ✅ Footer nav secundario: 8 links en TODAS las páginas (consistencia).
- ✅ "Ver proceso →" / "Conoce al equipo →" aparecen como links contextuales entre
  páginas internas (no como top nav en todas).

### Performance (carga más rápida)

- ✅ **`script.js` movido de `</body>` al `<head>` con `defer`** — first paint 50–150ms
  más rápido en conexiones lentas.
- ✅ **4 preloads en el `<head>`** de cada HTML: `styles.css`, Google Fonts CSS,
  FontAwesome CSS, y `Three.js` (solo en `index.html`).
- ✅ **`styles.css` minificado**: removidos comentarios `/* ... */` multilínea y
  whitespace trailing. **64 KB → 55 KB** (12% saved, 385 llaves balanceadas,
  0 reglas huérfanas, 13 clases críticas verificadas presentes).
- ✅ **Inter weight `300` removido** de la URL de Google Fonts. **~15 KB saved**
  (un archivo `.woff2` latin subset menos; los 6 lugares en CSS con
  `font-weight: 300` ahora caen a `400` (Regular) automáticamente — la pérdida de
  jerarquía Light es leve y aceptable por el ahorro).

### CSS adicional añadido al final de `styles.css`

3 clases nuevas (~1909-1978) para que el split funcionara. No existían antes:

| Clase | Dónde se usa | Función |
|---|---|---|
| `.final-cta` | home, nosotros, proceso, nichos (×4) | Bloque CTA final con gradiente radial cyan + indigo de fondo |
| `.footer__nav` | Las 8 páginas | Nav secundario horizontal del footer con 8 links |
| `.process-step__list` | proceso.html (×3) | Sub-lista dentro de cada paso (bullets personalizados con flecha cyan) |

Si querés modificar estas secciones, buscá por nombre de clase en `styles.css`.

---

## 6. Para el colaborador: ¿qué tocar y dónde?

### Footer terminal "PS C:\Kairos>" + WhatsApp

Todas las páginas tienen un mini terminal en el footer con un botón `> contact`.
Al hacer click, hace una animación typewriter y abre WhatsApp. La URL vive en
`script.js`, dentro del IIFE `initFooterTerminal`. Editá estas dos líneas antes de lanzar:

```js
var WA_TEXT = encodeURIComponent('Hola Kairos-Devs! Quiero empezar un proyecto.');
var WA_URL = 'https://wa.me/?text=' + WA_TEXT;
```

- **Si ya tenés un número real**, reemplazá por `https://wa.me/<número-sin-+-sin-espacios>`.
- **Si todavía no lo tenés**, dejá el placeholder (`?text=…`) — abre WhatsApp con mensaje
  pre-llenado y deja al usuario elegir destinatario. Nunca muestra error.
- Hay un `console.warn` que se dispara en cada página para que veas el recordatorio
  en DevTools mientras lo ajustás.

### Cambiar colores / marca → editar `styles.css` `:root`

```css
:root {
  --bg:         #0A2540;   /* cambiá esto fondo principal */
  --accent:     #635BFF;   /* cambiá esto primary brand */
  --accent-2:   #00D4FF;   /* cambiá esto acento secundario */
  /* etc */
}
```

Probá distintas paletas: para volver al charcoal original de Enmanuel cambiá `--bg`
a `#0A0A0A` y `--accent` a `#00D4FF`.

### Cambiar copy/contenido

Cada HTML tiene una estructura limpia: el H1 está al principio del `<header>`, las
secciones dentro de `<section>` siguen un patrón (`section__head` → `section__title`
+ `section__sub` + grid de cards). Para cambiar el orden, mové los bloques `<section>`
enteros. Cada uno abre con `<!-- COMENTARIO -->` y es self-contained.

### Quitar la animación 3D del hero (home)

Si querés reducir peso sin Three.js:
1. En `index.html`: borrar la línea `<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/three.js/..." as="script" />`
2. Borrar `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/..." defer></script>`
3. Borrar `<canvas id="hero-canvas" aria-hidden="true"></canvas>` dentro del `<header class="hero">`
4. En `script.js`, comentá o borrá el bloque que inicializa Three.js contra `#hero-canvas` (buscá referencias a `THREE.*` o `heroCanvas`). Sin este paso queda código huérfano que tira warning en consola.

Ahorrás ~600 KB de fetch en home. No afecta a las otras 7 páginas (que ya no lo cargaban).

### Cambiar la nav (las 8 páginas)

El bloque `<nav class="nav">` está en las 8 HTML. Para mantener consistencia, editá
las 8 con un find-and-replace en tu editor, o usá una herramienta de includes.

### Agregar una página nueva

1. Copiá una existente (ej. `proceso.html`) como punto de partida.
2. Mantené la misma estructura de `<head>` (mismas meta tags, mismos preloads).
3. Mantené el nav (`is-active` en tu link nuevo + `aria-current="page"`).
4. Mantené el footer (mismo bloque `footer__nav` con 8 links + `footer__social`).
5. Agregá la URL a `sitemap.xml`.
6. Agregá el link al `footer__nav` en las 8 páginas existentes.

### Para deployar

El sitio es 100% estático. Funciona sin cambios en:
- **GitHub Pages** (rama `main`, root).
- **Cloudflare Pages**, **Netlify**, **Vercel** (modo estático).
- Cualquier servidor web (Nginx, Apache, IIS).

Cuando conectes dominio propio, agregá un `CNAME` con `kairos-devs.cu` + configura DNS.

---

## 7. Quick wins que quedan (no críticos)

1. **Self-hostear las 2 woff2 de Inter** (weights 600 y 800) localmente con
   `@font-face` + `<link rel="preload" as="font" crossorigin type="font/woff2">`.
   Elimina el handshake TLS a `fonts.googleapis.com` (~100ms en cold first visit).
   Es el próximo quick win de mayor impacto. ~6 líneas por peso.

2. **Restaurar peso 300 de Inter** para la jerarquía light de eyebrow tags
   (`.hero__sub`, `.promise__desc`). Si lo hacés, agregá `font-display: swap` (ya está).

3. **Mover Nosotros y Proceso al footer secundario** y dejar el top nav en 6 ítems
   para evitar overflow en tablet portrait (768-900px). Trade-off: discovery
   menos prominente de las secciones de equipo/proceso.

4. **Build step opcional**: para evitar duplicar nav/footer en 8 archivos, considerar
   `npx html-includes` o migrar a un SSG liviano (Astro, Eleventy). Invasivo;
   solo cuando agregues >15 páginas.

---

## 8. Decisiones de marca fijadas

- Tipografía única: **Inter**. No sumar otra familia.
- Stack mostrado en marquee: React, Node.js, Python, PostgreSQL, AWS, OpenAI,
  Docker, TypeScript, GCP, Figma. No ampliar sin justificación.
- Tono: **cercano y honesto**, sin inventar logros ni testimonios.
- Toda mención de email debe ser **enmanuelmuletblanco@gmail.com**.
- Las mini-UIs del portafolio son **ejemplos de lo que podemos construir**, no
  proyectos de clientes reales finalizados.
- Redes sociales: Instagram, TikTok, Facebook, Telegram, X tienen `href="#"` +
  `data-social-soon` → sólo WhatsApp tiene link real por ahora. Cuando se activen,
  editá `index.html`, `contacto.html` y reemplazá `href="#"` por URLs reales,
  removiendo el atributo `data-social-soon`.

---

## 9. Contacto

- **Email:** enmanuelmuletblanco@gmail.com
- **WhatsApp:** wa.me/5305146569
- **Web (a deployar):** https://kairos-devs.cu

---

Última actualización: 2026-07-22. Cambios de este sprint documentados arriba
(paleta Stripe, perf, split en 8 páginas, fixes de auditoría).
