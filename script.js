    // ============ LOADER ============
    const hideLoader = () => document.getElementById('loader')?.classList.add('is-hidden');
    window.addEventListener('load', () => setTimeout(hideLoader, 400));
    setTimeout(hideLoader, 4000); // fallback duro

    // ============ CURSOR PERSONALIZADO ============
    const cursorRing = document.getElementById('cursorRing');
    const cursorDot  = document.getElementById('cursorDot');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    function animateCursor() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hover'));
    });

    // ============ RIPPLE EN BOTÓN PRIMARIO ============
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      });
    });

    // ============ THREE.JS — HERO 3D ============
    (function initHero3D() {
      if (typeof THREE === 'undefined') return;
      const canvas = document.getElementById('hero-canvas');
      // Guard: solo init si la página actual tiene el canvas (solo index.html).
      if (!canvas) return;
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.z = 7;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

      const stars = (() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(200 * 3);
        for (let i = 0; i < 200; i++) {
          positions[i * 3]     = (Math.random() - 0.5) * 40;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.7 });
        const pts = new THREE.Points(geo, mat);
        scene.add(pts);
        return pts;
      })();

      const nodesGroup = new THREE.Group();
      scene.add(nodesGroup);

      const CUBE_SIZE = 2;
      const nodes = [];
      const NODE_SPHERE_GEO = new THREE.SphereGeometry(0.1, 16, 16);

      for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) for (let z = 0; z < 2; z++) {
        const mat = new THREE.MeshBasicMaterial({ color: 0x00D4FF });
        const sphere = new THREE.Mesh(NODE_SPHERE_GEO, mat);
        sphere.position.set(
          (x - 0.5) * CUBE_SIZE,
          (y - 0.5) * CUBE_SIZE,
          (z - 0.5) * CUBE_SIZE
        );
        sphere.userData.basePos = sphere.position.clone();
        sphere.userData.exploded = false;
        nodesGroup.add(sphere);
        nodes.push(sphere);
      }

      const linesMat = new THREE.LineBasicMaterial({ color: 0x635BFF, transparent: true, opacity: 0.7 });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i].position, b = nodes[j].position;
        const dx = Math.abs(a.x - b.x), dy = Math.abs(a.y - b.y), dz = Math.abs(a.z - b.z);
        if (dx + dy + dz === CUBE_SIZE) {
          const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
          const line = new THREE.Line(geo, linesMat);
          line.userData.a = i; line.userData.b = j;
          nodesGroup.add(line);
        }
      }

      const targetRot = { x: 0, y: 0 };
      window.addEventListener('mousemove', (e) => {
        const nx = (e.clientX / window.innerWidth)  * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        targetRot.y = nx * 0.26;
        targetRot.x = ny * 0.26;
        stars.rotation.x = ny * 0.1;
        stars.rotation.y = nx * 0.1;
      });

      let explodeAmount = 0;
      window.addEventListener('scroll', () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        explodeAmount = Math.max(0, (p - 0.15) * 1.8);
      }, { passive: true });

      function animate() {
        nodesGroup.rotation.y += (targetRot.y - nodesGroup.rotation.y) * 0.05;
        nodesGroup.rotation.x += (targetRot.x - nodesGroup.rotation.x) * 0.05;
        nodesGroup.rotation.y += 0.0015;
        nodesGroup.rotation.x += 0.0008;

        nodes.forEach((n, idx) => {
          const target = n.userData.basePos.clone().multiplyScalar(1 + explodeAmount * (1 + (idx % 3) * 0.3));
          n.position.lerp(target, 0.1);
        });

        nodesGroup.children.forEach(child => {
          if (child.isLine) {
            const a = nodes[child.userData.a].position;
            const b = nodes[child.userData.b].position;
            child.geometry.setFromPoints([a, b]);
          }
        });

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      });
    })();

    // ============ SCROLL PROGRESS BAR (NUEVO) ============
    // Throttle con requestAnimationFrame para evitar escribir al DOM en
    // cada evento scroll (en páginas largas se nota).
    const progressBar = document.getElementById('scrollProgress');
    let progressTicking = false;
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progressBar.style.width = pct + '%';
      progressTicking = false;
    };
    const onProgressScroll = () => {
      if (progressTicking) return;
      progressTicking = true;
      requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', onProgressScroll, { passive: true });
    window.addEventListener('resize', onProgressScroll, { passive: true });
    updateProgress();

    // ============ INTERSECTION OBSERVER (fade-in + steps) ============
    // NOTA: en la versión multi-página el active-link del nav se aplica
    // server-side (class="is-active" en el HTML de cada página). El viejo
    // scroll-spy quedó obsoleto al migrar de #anchors a .html files.
    const fadeEls = document.querySelectorAll('.fade-in, [data-step]');

    const ioNav = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          ioNav.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in, [data-step]').forEach(el => ioNav.observe(el));

    // ============ STATS COUNTER ANIMADO (NUEVO) ============
    // Dispara cuando la sección entra en viewport.
    const animateCount = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const numEl  = el.querySelector('.stat__num');
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const value = Math.round(target * eased);
        // textContent (no innerHTML) para que "<24h" se renderice literal,
        // sin que el "<" se interprete como apertura de tag por el parser.
        numEl.textContent = `${prefix}${value}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    const ioStats = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          ioStats.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.stat[data-count]').forEach(el => ioStats.observe(el));

    // ============ FORM → WHATSAPP (NUEVO) ============
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = document.getElementById('cf-name').value.trim();
      const email   = document.getElementById('cf-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      // Validación nativa (HTML5 required + minlength)
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // IMPORTANTE: encodeURIComponent para que caracteres como &, ?, #,
      // saltos de línea, emojis o espacios en el mensaje NO rompan el URL.
      const lines = [
        'Hola 👋 Vengo de kairos-devs.cu.',
        '',
        `*Nombre:* ${name}`,
        `*Email:* ${email}`,
        `*Mensaje:* ${message}`,
      ];
      const url = 'https://wa.me/5305146569?text=' + encodeURIComponent(lines.join('\n'));

      // Truco anti-popup-blocker: creamos un <a> y disparamos .click()
      // simula navegación iniciada por el usuario → no es bloqueada.
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Estado de éxito en UI + reset del form para próximo envío limpio
      form.classList.add('is-sent');
      form.reset();
      setTimeout(() => form.classList.remove('is-sent'), 4000);
    });

    // ============ SOCIAL SOON (botones placeholder, sin links todavía) ============
    // Cualquier click en un [data-social-soon] muestra un toast suave y NO navega.
    document.querySelectorAll('[data-social-soon]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Próximamente con los enlaces reales 🔗');
      });
    });

    // Helper global de toast (reusable para cualquier feedback transitorio)
    const showToast = (msg, ms = 2500) => {
      let t = document.getElementById('globalToast');
      if (!t) {
        t = document.createElement('div');
        t.id = 'globalToast';
        t.style.cssText = [
          'position:fixed', 'top:84px', 'right:20px',
          'background:rgba(0,212,255,.95)', 'color:#001b22',
          'padding:10px 16px', 'border-radius:8px',
          'font-weight:600', 'font-size:.88rem',
          'z-index:1000', 'opacity:0',
          'transition:opacity .3s ease',
          'box-shadow:0 10px 30px rgba(0,0,0,.4)',
          'pointer-events:none',
        ].join(';');
        document.body.appendChild(t);
      }
      t.textContent = msg;
      t.style.opacity = '1';
      clearTimeout(t._hide);
      t._hide = setTimeout(() => { t.style.opacity = '0'; }, ms);
    };

    // ============ COPY EMAIL (FOOTER) ============
    const copyBtn = document.getElementById('copyEmail');
    copyBtn?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('enmanuelmuletblanco@gmail.com');
      } catch {
        const ta = document.createElement('textarea');
        ta.value = 'enmanuelmuletblanco@gmail.com';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      copyBtn.classList.add('is-copied');
      setTimeout(() => copyBtn.classList.remove('is-copied'), 1800);
    });

    // ============ YEAR FOOTER ============
    document.getElementById('year').textContent = new Date().getFullYear();

    // ============ MENÚ MÓVIL ============
    const burger = document.getElementById('burger');
    burger?.addEventListener('click', () => {
      document.querySelector('.nav__links')?.classList.toggle('is-open');
      burger.setAttribute('aria-expanded',
        burger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
    document.querySelectorAll('.nav__links a').forEach(a => {
      a.addEventListener('click', () => {
        document.querySelector('.nav__links')?.classList.remove('is-open');
        burger?.setAttribute('aria-expanded', 'false');
      });
    });
  