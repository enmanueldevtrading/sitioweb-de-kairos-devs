# 📋 Notas para el colaborador — kairos-devs.cu

Documento vivo sobre pendientes, decisiones de diseño y próximos pasos
del landing page `D:\Indicators\kairos-devs\index.html`. Actualizar al
avanzar con cada ítem.

---

## 🔴 Cuentas de redes sociales — PENDIENTES de crear

Las cuentas que se listan a continuación **se crearán más adelante**.
Por ahora el landing tiene botones visuales con placeholders
(`data-social-soon`) que al hacer click muestran un toast suave
diciendo *"Próximamente con los enlaces reales"*.

### Estado de cada cuenta

| Cuenta       | Estado       | Acción al activarse                              |
|--------------|--------------|--------------------------------------------------|
| WhatsApp     | ✅ Operativo | Número actual: `+53 05146569` (wa.me/5305146569) |
| Instagram    | ⏳ Pendiente | Reemplazar `href="#"` por URL real del perfil     |
| Telegram     | ⏳ Pendiente | Reemplazar `href="#"` por URL real del canal       |
| Facebook     | ⏳ Pendiente | Reemplazar `href="#"` por URL de la página         |
| **TikTok**   | ⏳ Pendiente | Reemplazar `href="#"` por URL real del perfil      |
| **X (Twitter)** | ⏳ Pendiente | Reemplazar `href="#"` por URL real del perfil   |

### Cómo reemplazar los placeholders

Una vez creada cada cuenta, editar `index.html` y buscar el atributo
`data-social-soon`. Para cada red:

1. Cambiar `href="#"` por la URL real correspondiente.
2. Quitar el atributo `data-social-soon` (así el botón navega
   normalmente sin mostrar el toast).
3. Verificar el ícono FontAwesome sigue siendo el correcto:

| Red       | Icono FontAwesome           | Color de marca |
|-----------|-----------------------------|----------------|
| WhatsApp  | `fa-brands fa-whatsapp`     | `#25D366`      |
| Instagram | `fa-brands fa-instagram`    | `#E1306C`      |
| Telegram  | `fa-brands fa-telegram`     | `#2AABEE`      |
| Facebook  | `fa-brands fa-facebook-f`   | `#1877F2`      |
| TikTok    | `fa-brands fa-tiktok`       | `#fe2c55`      |
| X         | `fa-brands fa-x-twitter`    | `#e7e9ea`      |

Los colores ya están aplicados en el CSS para que el hover de cada
botón muestre la identidad visual de la marca.

---

## 🚀 Próximos pasos planeados

En orden de prioridad:

1. Crear las cuentas de redes sociales faltantes (orden sugerido:
   Instagram → TikTok → Facebook → Telegram → X).
2. Crear identidad visual consistente (mismo logo, misma bio,
   mismo tono de voz) en todas las redes.
3. Configurar calendly o cal.com para el agendamiento de diagnóstico
   (pendiente de definir — sección de contacto está lista para
   embeberlo con un iframe).
4. **Inicializar repositorio git en esta carpeta** y subir la página
   a GitHub. (Owner de GitHub inferido desde el remote del proyecto
   hermano `kairos-platform`: `enmanueldevtrading`. Repo sugerido:
   `kairos-devs.cu`. Ya hay un PAT válido en `~/.git-credentials`.)
5. Opcional: separar el monolito de ~2000 líneas en archivos
   individuales `index.html`, `styles.css` y `script.js` para
   mantenimiento más fácil.

---

## 🎨 Decisiones de diseño fijadas

- `#00D4FF` (cyan) es el acento principal
- `#635BFF` (púrpura) es el acento secundario
- `#FF6B6B` (rojo) se reserva para emergencias / acentos negativos
- Tipografía única: **Inter** (300 / 600 / 800)
- Stack mostrado: React, Node.js, Python, PostgreSQL, AWS, OpenAI,
  Docker, TypeScript, GCP, Figma
- Tono de voz: **cercano y honesto**, sin inventar logros ni testimonios
- Toda mención de email debe ser **enmanuelmuletblanco@gmail.com**
  (no `hola@kairos-devs.cu`)
- Las mini-UIs del portafolio son **ejemplos de lo que podemos
  construir**, no proyectos de clientes reales finalizados

---

## 📞 Datos de contacto vigentes

- **Email**: enmanuelmuletblanco@gmail.com
- **WhatsApp**: +53 05146569 (placeholder — actualizar si hay número real)
- **Marca**: kairos-devs.cu
- **Dominio principal**: el landing aún NO está desplegado en dominio
  propio (apunta a GitHub Pages cuando se suba)

---

## 🔖 Versión actual del archivo

- Single-file: `index.html` (~2000 líneas, ~80KB)
- Animaciones clave: hero 3D con Three.js, cursor personalizado,
  scroll progress bar, loader, marquee de stack, barras del dashboard,
  typing dots del chat
- Sin dependencias de build. Funciona con sólo abrirlo en navegador.

Cualquier duda, revisar este archivo primero.
