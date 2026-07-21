# kairos-devs.cu

> **Transformamos tu caos en orden digital** — automatizaciones
> inteligentes, aplicaciones a medida y webs que convierten.
> Hecho en Cuba 🇨🇺 con estándar global.

Sitio oficial: **https://kairos-devs.cu**

---

## 🇪🇸 Descripción

`kairos-devs.cu` es el sitio público de la marca operada por
**Enmanuel Mulet Blanco**. Presenta los servicios de desarrollo web,
automatización con IA, RPA + Excel, e-commerce, dashboards en tiempo
real, APIs/microservicios, consultoría y migración tecnológica para
PYMEs.

## 🇺🇸 Description

`kairos-devs.cu` is the marketing site for the brand operated by
**Enmanuel Mulet Blanco**. It showcases web development, AI automation,
RPA + Excel, e-commerce, real-time dashboards, APIs/microservices,
consulting, and tech-migration services for SMBs.

---

## 🧱 Stack

- **HTML5** semántico, multi-página (5 vistas).
- **CSS3** vanilla con variables (1908 líneas, paleta de marca).
- **JavaScript** vanilla (328 líneas) + Three.js (CDN, hero 3D).
- **FontAwesome** (CDN) para íconos sociales.
- **Tipografía:** Inter (Google Fonts, pesos 300 / 600 / 800).
- **Sin build step.** Funciona abriendo `index.html` o con cualquier
  servidor estático.

## 🎨 Identidad de marca

| Token  | Color     | Uso                                  |
|--------|-----------|--------------------------------------|
| Cyan   | `#00D4FF` | Acento principal / CTAs              |
| Purple | `#635BFF` | Acento secundario                    |
| Red    | `#FF6B6B` | Reservado (emergencias, acentos)     |
| BG     | `#0A0A0A` | Fondo carbón                         |

---

## 📂 Estructura del repo

| Archivo             | Qué contiene                                         |
|---------------------|------------------------------------------------------|
| `index.html`        | Hero 3D + servicios + proceso + portafolio + FAQ     |
| `servicios.html`    | Catálogo de 9 servicios                              |
| `portafolio.html`   | 6 mockups de proyectos posibles                      |
| `faq.html`          | Preguntas frecuentes                                 |
| `contacto.html`     | Formulario + WhatsApp + email + redes sociales       |
| `styles.css`        | Hoja de estilos global (sin frameworks)              |
| `script.js`         | Scripts de UI (cursor, loader, scroll, efectos)      |
| `og-image.svg`      | Open Graph 1200×630 para redes sociales              |
| `robots.txt`        | Permite todo + declara el sitemap                    |
| `sitemap.xml`       | Sitemap XML con las 5 URLs                           |
| `.gitignore`        | Ignora logs locales, archivos temporales del servidor|
| `COLABORADOR-NOTAS.md` | Notas internas de seguimiento del proyecto       |
| `LICENSE`           | Términos de uso (All Rights Reserved)                |

---

## 🚀 Cómo correr en local

### Opción 1 — servidor estático con Python

```bash
python -m http.server 8000
# abrí http://localhost:8000 en el navegador
```

### Opción 2 — abrir directo

Abrí `index.html` directamente en el navegador. (Las URLs relativas
funcionan, pero las features CDN requieren conexión.)

---

## ☁️ Deploy

El sitio es 100 % estático. Funciona sin cambios en:

- **GitHub Pages** (rama `main`, root).
- **Cloudflare Pages**, **Netlify**, **Vercel** (modo estático).
- Cualquier servidor web (Nginx, Apache, IIS, etc.).

Cuando se conecte un dominio propio (`kairos-devs.cu`), agregá un
archivo `CNAME` en la raíz con el dominio y configurá el DNS.

---

## 📬 Contacto

- **Email:** enmanuelmuletblanco@gmail.com
- **WhatsApp:** wa.me/5305146569
- **Web:** https://kairos-devs.cu

Las redes sociales vigentes están listadas en `contacto.html`.

---

## 👤 Autor

**Enmanuel Mulet Blanco** — desarrollador y fundador de kairos-devs.cu.

---

## 📄 Licencia

Copyright © 2026 Enmanuel Mulet Blanco. Todos los derechos reservados.
Ver [`LICENSE`](./LICENSE) para los términos completos.
