/* ============================================================
   kairos-devs.cu · script.js (V2 limpio y defensivo)
   ============================================================ */
(function () {
  if (typeof window === 'undefined') return;

  // ===== HARD ERROR SUPPRESSOR =====
  // MDN spec: window.onerror returning true suprime display en consola.
  window.onerror = function (msg, src, line) {
    try { console.warn('[Kairos onerror]', src || 'inline', 'L' + (line || '?') + ':', msg); } catch (_) {}
    return true;
  };
  window.onunhandledrejection = function (e) {
    try { console.warn('[Kairos rejection]', e && e.reason); } catch (_) {}
    return true;
  };

  // ===== LOADER =====
  function hideLoader() {
    var l = document.getElementById('loader');
    if (l && l.classList) l.classList.add('is-hidden');
  }
  window.addEventListener('load', function () { setTimeout(hideLoader, 200); });
  setTimeout(hideLoader, 1000);

  // ===== RIPPLE EN BOTÓN PRIMARIO =====
  function bindRipples() {
    var btns = document.querySelectorAll('.btn-primary');
    btns.forEach(function (btn) {
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        try {
          var rect = btn.getBoundingClientRect();
          var ripple = document.createElement('span');
          ripple.className = 'ripple';
          var size = Math.max(rect.width, rect.height);
          if (ripple.style) {
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
          }
          btn.appendChild(ripple);
          setTimeout(function () { if (ripple && ripple.remove) ripple.remove(); }, 700);
        } catch (_) {}
      });
    });
  }

  // ===== INIT V2: Lenis + magnetic + reveal =====
  function initV2() {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lenis smooth scroll (sólo si el CDN lo cargó + no reduced-motion)
    if (!reduced && typeof window.Lenis === 'function') {
      try {
        var lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
        function raf(time) { try { lenis.raf(time); } catch(_) {} requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
      } catch (_) { /* silent */ }
    }

    // Magnetic cursor: mueve el elemento un poco con el mouse
    var magnets = document.querySelectorAll('[data-magnetic]');
    magnets.forEach(function (el) {
      if (!el) return;
      el.addEventListener('mousemove', function (e) {
        if (reduced) return;
        try {
          var r = el.getBoundingClientRect();
          var x = e.clientX - r.left - r.width / 2;
          var y = e.clientY - r.top - r.height / 2;
          el.style.transform = 'translate(' + (x * 0.2) + 'px,' + (y * 0.2) + 'px)';
        } catch (_) {}
      });
      el.addEventListener('mouseleave', function () {
        try { el.style.transform = ''; } catch (_) {}
      });
    });

    // Reveal-on-scroll observer
    var reveals = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && reveals.length) {
      try {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting && en.target && en.target.classList) {
              en.target.classList.add('is-visible');
              io.unobserve(en.target);
            }
          });
        }, { threshold: 0.15 });
        reveals.forEach(function (el) { io.observe(el); });
      } catch (_) { /* silent */ }
    }

    // Reveal-on-scroll observer para .fade-in (el CSS pone opacity:0; sin observer quedan invisibles)
    var fadeIns = document.querySelectorAll('.fade-in:not(.is-visible)');
    if ('IntersectionObserver' in window && fadeIns.length) {
      try {
        var ioF = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting && en.target && en.target.classList && !en.target.classList.contains('is-visible')) {
              en.target.classList.add('is-visible');
              ioF.unobserve(en.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        fadeIns.forEach(function (el) { ioF.observe(el); });
      } catch (_) { /* silent */ }
    } else if (fadeIns.length) {
      try { fadeIns.forEach(function (el) { if (el && el.classList) el.classList.add('is-visible'); }); } catch (_) {}
    }

    // Anti-flash: marcar visibles los .fade-in que YA están en viewport en el primer paint.
    // Una sola pasada de rects en batch — evita 30 reflows individuales.
    try {
      var winH = window.innerHeight;
      var aboveFold = [];
      var rects = [];
      for (var k = 0; k < fadeIns.length; k++) rects.push(fadeIns[k].getBoundingClientRect());
      for (var kk = 0; kk < fadeIns.length; kk++) {
        var r = rects[kk];
        if (r.top < winH && r.bottom > 0) aboveFold.push(fadeIns[kk]);
      }
      for (var af = 0; af < aboveFold.length; af++) {
        if (aboveFold[af] && aboveFold[af].classList) aboveFold[af].classList.add('is-visible');
      }
      // Los que NO están arriba del fold quedan observados por ioF para revelado on-scroll.
    } catch (_) {}
  }


  // ===== CURSOR FOLLOWER (Lenis ya está en initV2) =====

  function initCursorFollower() {
    // 1:1 con el mouse, sin lerp ni rAF — se siente nativo, no “atrapa” ni “pesa”
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var dot = document.getElementById('cursorDot');
    var ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;
    window.addEventListener('mousemove', function (e) {
      try {
        dot.style.left  = e.clientX + 'px';
        dot.style.top   = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top  = e.clientY + 'px';
      } catch (_) {}
    }, { passive: true });
    var HOVER_SEL = 'a,button,[data-hover],[data-magnetic],input,textarea,select,label';
    document.addEventListener('mouseover', function (e) {
      if (e.target && e.target.closest && e.target.closest(HOVER_SEL)) ring.classList.add('is-hover');
    }, { passive: true });
    document.addEventListener('mouseout', function (e) {
      var t = e.relatedTarget;
      if (!t || !(t.closest && t.closest(HOVER_SEL))) ring.classList.remove('is-hover');
    }, { passive: true });
  }

  // ===== INIT FONDO ESTÁTICO (imagen hero-bg.jfif vía CSS background-image) =====
  function initCodeBg() {
    if (!document.body) return;
    try {
      var bg = document.createElement('div');
      bg.className = 'code-bg';
      bg.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(bg, document.body.firstChild);
    } catch (_) {}
  }

  // ===== INIT FORMULARIO CONTACTO → WhatsApp =====
  // Liga id="contactForm"; al hacer submit toma los campos y abre wa.me
  // con un mensaje pre-armado. Si el popup es bloqueado, muestra fallback en pantalla.
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    try {
      var WA_PHONE  = '5305146569';
      var submitBtn = form.querySelector('.form__submit');
      var success   = form.querySelector('.form__success');

      function read(name) {
        var el = form.querySelector('[name="' + name + '"]');
        return (el && el.value) ? el.value.trim() : '';
      }

      function buildMsg() {
        var lines = [];
        var name    = read('name');
        var service = read('service');
        var budget  = read('budget');
        var message = read('message');

        if (name)    lines.push('Hola Kairos-Devs, soy ' + name + '.');
        else         lines.push('Hola Kairos-Devs!');
        if (service) lines.push('Servicio: ' + service);
        if (budget)  lines.push('Presupuesto aproximado: ' + budget);
        if (message) lines.push('\nMensaje:\n' + message);
        lines.push('\n— Vengo del formulario de kairos-devs.cu');
        return lines.join('\n');
      }

      function showFallback(url) {
        if (!success) return;
        success.innerHTML =
          '<i class="fa-brands fa-whatsapp"></i> ' +
          'No pudimos abrir WhatsApp automáticamente. ' +
          '<a href="' + url + '" target="_blank" rel="noopener">Haz click aquí</a> ' +
          'para abrirlo manualmente.';
        success.style.display = 'block';
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        try {
          var msg  = buildMsg();
          var name = read('name');
          var body = read('message');
          if (!name && !body) {
            var firstIn = form.querySelector('input,textarea');
            if (firstIn) firstIn.focus();
            return;
          }
          var url = 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(msg);

          if (submitBtn) {
            submitBtn.disabled = true;
            var prevText = submitBtn.innerHTML;
            submitBtn.setAttribute('data-orig', prevText);
            submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Abriendo WhatsApp…';
          }

          var win = window.open(url, '_blank', 'noopener');
          // Si el popup fue bloqueado, mostramos fallback visible
          setTimeout(function () {
            if (!win || win.closed) {
              showFallback(url);
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = submitBtn.getAttribute('data-orig') || prevText;
              }
            } else {
              if (success) {
                success.innerHTML =
                  '<i class="fa-brands fa-whatsapp"></i> ' +
                  '¡Listo! WhatsApp se abrió con tu mensaje. ' +
                  'Si no lo ves, <a href="' + url + '" target="_blank" rel="noopener">haz click aquí</a>.';
                success.style.display = 'block';
              }
            }
          }, 400);
        } catch (_) {
          /* silent */
        }
      });
    } catch (_) {
      /* silent */
    }
  }

  // ===== INIT ALL =====
  try { bindRipples(); } catch (_) {}
  try { initV2(); } catch (_) {}
  try { initCursorFollower(); } catch (_) {}
  try { initCodeBg(); } catch (_) {}
  try { initContactForm(); } catch (_) {}
})();
