# DEPLOY — sitioweb-de-kairos-devs (proyecto)

> **Para el desarrollador que recibe este proyecto.**
> Esta es la guía práctica para llevarlo a producción en
> **Cloudflare Pages** conectado a GitHub. Modificá lo que quieras.

---

## 1. TL;DR (3 pasos, ~10 min)

```bash
# 1) Subir cambios a GitHub
git push origin main

# 2) En Cloudflare → Pages → Connect to Git → seleccionar el repo
#    Configuración de build:
#       Framework preset:  None
#       Build command:     (vacío)
#       Build output:      /
#       Root directory:    (vacío / raíz del repo)

# 3) En Cloudflare → Workers & Pages → tu proyecto → Custom domains
#    Agregar:  sitioweb-de-kairos-devs (proyecto)  y  www.sitioweb-de-kairos-devs (proyecto)
```

Listo. Cada `git push` a `main` redespliega automáticamente
(CDN global edge, <30s, cert TLS automático).

---

## 2. Pre-requisitos

- **Cuenta GitHub** con acceso al repo
  `https://github.com/enmanueldevtrading/sitioweb-de-kairos-devs`.
- **Cuenta Cloudflare** (free tier alcanza — no requiere tarjeta).
- Dominio `sitioweb-de-kairos-devs (proyecto)` accesible desde el panel DNS de Cloudflare
  (o el registrador que uses).

No necesitás:
- Node.js / Python / cualquier runtime.
- Build step (`npm run build`).
- Variables de entorno.

---

## 3. ¿Por qué Cloudflare Pages?

| Ventaja | Detalle |
|---|---|
| **Velocidad** | CDN global en 300+ ciudades (latencia típica <50ms en Cuba/LATAM/USA/EU) |
| **HTTPS automático** | Cert Let's Encrypt provisioning al conectar dominio |
| **Preview deploys** | Cada PR genera URL única (`pr-42.kairos-devs.pages.dev`) |
| **Sin build** | Este sitio es 100% estático, serví directamente sin bundling |
| **Free tier generoso** | Requests ilimitados, builds 500/mes, 100GB bandwidth |
| **Rollback instantáneo** | 1 click en dashboard → volvés a un deploy anterior |
| **Analytics incluidos** | Web vitals + посещаемость sin Google Analytics |

---

## 4. Push a GitHub (con SSH recomendado)

### Opción A — HTTPS + token (más simple)

```bash
# Una vez: configurar el remote con tu PAT (Personal Access Token)
git remote set-url origin https://<TOKEN>@github.com/enmanueldevtrading/sitioweb-de-kairos-devs.git

# Cada deploy:
git push origin main
```

### Opción B — SSH (más cómodo a largo plazo)

```bash
# Una vez: subir tu clave pública a GitHub → Settings → SSH and GPG keys
ssh-keygen -t ed25519 -C "tu@email.com"          # si no tenés clave
# Pegar el contenido de ~/.ssh/id_ed25519.pub en GitHub

# El remote ya viene en SSH? Si no:
git remote set-url origin git@github.com:enmanueldevtrading/sitioweb-de-kairos-devs.git

# Cada deploy:
git push origin main
```

### Comandos comunes

```bash
git status                     # revisar archivos modificados
git add -A                     # stagear todo
git status                     # confirmar lo que va al commit
git commit -m "feat: descripción"   # commit local
git push origin main           # push a GitHub
```

> **Tip:** nunca hagas `git add -A` antes de revisar el diff con
> `git diff --staged`. En particular verificá que no estés
> subiendo credenciales o archivos con paths relativos a tu PC.

---

## 5. Setup en Cloudflare (paso a paso)

### 5.1 Crear proyecto

1. **Cloudflare Dashboard** → **Workers & Pages** → **Create application**
2. Pestaña **Pages** → **Connect to Git**
3. Seleccioná **GitHub** → autorizá Cloudflare → elegí el repo
   `enmanueldevtrading/sitioweb-de-kairos-devs`
4. **Setup build and deployments**:
   - **Project name:** `kairos-devs` (o el que prefieras)
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** *vacío*
   - **Build output directory:** `/`
   - **Root directory (advanced):** *vacío*
5. **Save and Deploy**. Primer build toma ~30s. Tu sitio queda en
   `https://kairos-devs.pages.dev`.

### 5.2 Conectar dominio custom

1. En el proyecto → **Custom domains** → **Set up a custom domain**
2. Agregá `sitioweb-de-kairos-devs (proyecto)` — Cloudflare intentará provisionar cert TLS
   automáticamente (tarda ~5 min).
3. Agregá también `www.sitioweb-de-kairos-devs (proyecto)` (con redirect a apex o no).
4. DNS en Cloudflare:
   - Si el dominio está en otro registrador (GoDaddy, Namecheap, etc.),
     apuntá los nameservers a Cloudflare (`zelda.ns.cloudflare.com`,
     `kanye.ns.cloudflare.com` — te los da el wizard).
   - Si ya está en Cloudflare, simplemente agregá los records A/AAAA
     que Cloudflare te sugiere.

### 5.3 HTTPS & HSTS

Activá **Always Use HTTPS** en el dashboard de Custom domains.
Opcionalmente activá **HSTS** (Strict-Transport-Security header)
después de validar que TODO funcione en HTTPS.

### 5.4 Headers de seguridad

Cloudflare Pages permite headers personalizados en un archivo
`_headers` en la raíz. Ya recomendado agregar:

```
# _headers
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=()
```

(Creá un archivo `_headers` con este contenido en la raíz y commit.)

---

## 6. Estructura del proyecto (cómo está organizado)

```
sitioweb-de-kairos-devs (proyecto)/
├── index.html             Home (hero + tech marquee + 4 promesas + servicios + ventaja Cuba + CTA)
├── servicios.html         Catálogo de 9 servicios
├── nichos.html            6 nichos (odontólogos, estéticos, constructoras, tiendas, rest, locales)
├── portafolio.html        6 casos de estudio + 3 mockups visuales
├── nosotros.html          Equipo (Enmanuel + 3 roles colaboradores)
├── proceso.html           3 pasos (Diagnóstico / Sprint / Lanzamiento)
├── faq.html               6 preguntas frecuentes
├── contacto.html          Form → WhatsApp + socials + email
├── styles.css             ~2050 líneas, ~55KB, paleta en :root, mobile overrides
├── script.js              ~290 líneas, IIFE defensivo, init functions: cursor, scroll, form→WA
├── hero-bg.jfif           Imagen de fondo del sitio (130 KB, ASCII renombrada, en raíz)
├── og-image.svg           Open Graph 1200×630
├── robots.txt             Permite todo + sitemap
├── sitemap.xml            Sitemap con las 8 URLs
├── _headers               (opcional) Headers de seguridad por carpeta
├── .gitignore             Ignora logs y archivos temporales
├── README.md              Descripción pública del proyecto
├── HANDOFF.md             Tutorial detallado de mantenimiento (legacy)
├── DEPLOY.md              ESTE ARCHIVO (guía rápida de GitHub + Cloudflare Pages)
└── LICENSE                Copyright (All Rights Reserved)
```

> **Nota:** todos los HTML cargan `styles.css?v=3.cdnjs` ... actualmente
> `styles.css?v=19` y `script.js?v=19`. Si tocás el CSS/JS, bump el
> cache-bust manual (`?v=N+1`) en los 8 HTMLs. En Cloudflare Pages
> el cache del browser del usuario ya es suficiente; este query es
> para forzar autoreload si el user final no hace hard refresh.

---

## 7. ¿Qué archivos tocar para cambios comunes?

| Querés cambiar | Andá a | Línea / sección |
|---|---|---|
| Colores de marca | `styles.css` `:root` | Líneas 5-13 |
| Tipografía | `index.html` y los 7 otros HTMLs `<link>` | Google Fonts `<link>` |
| Número WhatsApp | `script.js` (`initFooterTerminal` WA_PHONE y `initContactForm` WA_PHONE) + `contacto.html` (anchors directos) | grep `5305146569` |
| Email | buscar en 8 HTMLs | `enmanuelmuletblanco@gmail.com` aparece en varios sitios |
| Imagen de fondo | `styles.css` `.code-bg` y reemplaza `hero-bg.jfif` en la raíz | bloque V4 al final |
| Logo del footer / header | `styles.css` `.footer__logo` y `.nav__logo` | `clamp(1.25rem, ...)` |
| Agregar página nueva | copiá `proceso.html` como base | mantené nav y footer consistentes |
| Cambiar nav | las 8 HTMLs tienen el mismo `<nav class="nav">` | find-and-replace |
| Cambiar sitemap | `sitemap.xml` | agregá nueva URL con fecha |

---

## 8. ¿Cloudflare Pages tiene límites en el free tier?

| Recurso | Free tier |
|---|---|
| Builds | 500/mes |
| Requests | Ilimitados |
| Bandwidth | 100 GB/mes (para este sitio alcanza de sobra, <2GB/mes típico) |
| Concurrent users | Ilimitado |
| Custom domains | 100 |
| Preview deployments | Ilimitado |
| Build duration máxima | 20 min (no relevante para sitio estático) |

Si llegás a 500 builds/mes (poco probable), pasate a Workers Paid ($5/mes).

---

## 9. Después del deploy — checklist

- [ ] Verificá `https://kairos-devs.pages.dev` carga el sitio.
- [ ] Verificá `https://sitioweb-de-kairos-devs (proyecto)` carga con HTTPS (cert
  automático en Cloudflare toma ~5 min tras DNS).
- [ ] Probá el form de contacto → debe abrir WhatsApp con los
  datos del cliente pre-armados.
- [ ] Click en "Hablar directo por WhatsApp" en /contacto.html →
  debe abrir `wa.me/5305146569`.
- [ ] Click en cualquier link del footer → debe llevar a la
  página interna correspondiente (`is-active` + `aria-current`).
- [ ] Tab navigation con teclado → debe haber focus visible
  en cada elemento interactivo.
- [ ] Performance: en Chrome DevTools → Lighthouse → buen score
  Performance > 90, Accessibility > 95.
- [ ] Probá desde un celular con datos lentos (DevTools →
  Network → Slow 3G) → debe cargar texto del hero <2s.

---

## 10. Mantenimiento post-launch

- **Cada vez que toques algo**: `git add -A && git commit -m "..." && git push`
- **Cambios automáticos**: Cloudflare redespliega apenas detecta el push.
- **Sin downtime**: Cloudflare sirve desde el último deploy exitoso aunque
  el nuevo esté fallando.
- **Rollback**: en el dashboard → Deployments → click en uno anterior
  → "Rollback to this deploy" → instantáneo.

---

## 11. Troubleshooting rápido

| Síntoma | Causa común | Solución |
|---|---|---|
| Página en blanco | Caché del browser | Ctrl+Shift+R / Cmd+Shift+R |
| CSS no se actualiza | `?v=N` desactualizado | Bump en los 8 HTMLs + push |
| 404 en imagen | Nombre mal escrito o case-sensitive | Verificá nombre en .code-bg (`hero-bg.jfif`) |
| WhatsApp no abre | Popup blocked | Fallback `<a target="_blank">` ya implementado |
| Form no se envía | JS error | Abrí DevTools Console y verificá errores |
| Lighthouse score bajo | Imágenes no optimizadas | Optimizá `hero-bg.jfif` con tinypng |

---

## 12. Próximos pasos sugeridos (no críticos)

1. **Optimizar `hero-bg.jfif`**: 130 KB → ~50 KB con JPEG calidad 75
   o AVIF (`cwebp -q 75 hero-bg.jfif -o hero-bg.avif`).
2. **Self-host fonts**: bajar Inter 600 y 800 localmente con
   `@font-face`, evitando el round-trip a `fonts.googleapis.com`.
3. **Renombrar `.jfif` a `.jpg`**: misma imagen, MIME más universal.
   Actualizá url() en `.code-bg`.
4. **Setup commit hooks** (husky): lint de trailing whitespace + Prettier.
5. **Tests E2E con Playwright** en CI antes del merge (no crítico).

---

## 13. Créditos

- **Marca y contenido:** Enmanuel Mulet Blanco
- **Desarrollo y diseño:** kairos-devs (este sitio en sí es la muestra)
- **Hosting target:** Cloudflare Pages + dominio `sitioweb-de-kairos-devs (proyecto)`
- **Última actualización de este doc:** 2026-07-22

> **Recordá:** este `DEPLOY.md` es para vos. Modificalo cuando cambies
> el flujo. Mantenelo corto y orientado a pasos.
