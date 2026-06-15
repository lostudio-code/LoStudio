/* ============================================================
   LO STUDIO — motion, starfield & interaction (v3)
   ============================================================ */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];

  /* ---- graceful image fallbacks ---- */
  function handleImgError(img) {
    if (img.dataset.failed) return; img.dataset.failed = '1';
    if (img.closest('.who') || img.closest('.qc-slide')) {
      const initial = ((img.alt || '?').trim().charAt(0) || '?').toUpperCase();
      const d = document.createElement('div');
      d.className = 'avatar-fallback'; d.textContent = initial;
      img.replaceWith(d);
    } else if (img.dataset.mock) {
      const d = document.createElement('div');
      d.style.cssText = 'position:absolute;inset:0';
      d.innerHTML = img.dataset.mock;
      if (img.parentElement) img.parentElement.appendChild(d);
      img.style.display = 'none';
    } else { img.style.opacity = '0'; }
  }
  function bindImages(scope) {
    (scope || document).querySelectorAll('img').forEach((img) => {
      if (img._bound) return; img._bound = 1;
      img.addEventListener('error', () => handleImgError(img));
      if (img.complete && img.naturalWidth === 0) handleImgError(img);
    });
  }
  bindImages();
  window.LO_bindImages = bindImages;

  /* ---- logo fallback ---- */
  $$('.brand-logo').forEach((logo) => {
    logo.addEventListener('error', () => {
      logo.style.display = 'none';
      const fb = logo.parentElement.querySelector('.brand-fallback');
      if (fb) fb.style.display = 'flex';
    });
    if (logo.complete && logo.naturalWidth === 0) logo.dispatchEvent(new Event('error'));
  });

  /* ---- live clock (San Francisco) ---- */
  const clockEl = $('#clock');
  if (clockEl) {
    const tick = () => {
      try {
        clockEl.textContent = new Intl.DateTimeFormat('en-US', {
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Los_Angeles'
        }).format(new Date());
      } catch (e) { clockEl.textContent = new Date().toLocaleTimeString(); }
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---- mobile menu ---- */
  const overlay = $('#menuOverlay');
  $$('[data-menu-open]').forEach(b => b.addEventListener('click', () => overlay && overlay.classList.add('open')));
  $$('[data-menu-close]').forEach(b => b.addEventListener('click', () => overlay && overlay.classList.remove('open')));
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target.tagName === 'A') overlay.classList.remove('open'); });

  /* ---- rotating role words ---- */
  const rot = $('.role-rot');
  if (rot && !reduce) {
    const items = $$('span', rot);
    let i = 0; items[0].classList.add('on');
    setInterval(() => {
      const cur = items[i]; cur.classList.remove('on'); cur.classList.add('out');
      setTimeout(() => cur.classList.remove('out'), 600);
      i = (i + 1) % items.length;
      items[i].classList.add('on');
    }, 2200);
  } else if (rot) { $$('span', rot)[0].classList.add('on'); }

  /* ---- rolling-digit counters ---- */
  function buildRoll(el) {
    if (el._built) return; el._built = 1;
    const value = String(el.dataset.value || '0');
    const suffix = el.dataset.suffix || '';
    el.innerHTML = '';
    [...value].forEach((ch) => {
      if (ch >= '0' && ch <= '9') {
        const reel = document.createElement('span'); reel.className = 'reel';
        const col = document.createElement('span'); col.className = 'col';
        for (let d = 0; d <= 9; d++) { const s = document.createElement('span'); s.textContent = d; col.appendChild(s); }
        reel.appendChild(col); el.appendChild(reel);
        reel._target = parseInt(ch, 10);
      } else {
        const s = document.createElement('span'); s.textContent = ch; el.appendChild(s);
      }
    });
    if (suffix) { const sf = document.createElement('span'); sf.className = 'suffix'; sf.textContent = suffix; el.appendChild(sf); }
    fitReels(el);
  }
  /* size each reel to its target digit's true width so a narrow "1" has no trailing gap */
  function fitReels(el) {
    const cs = getComputedStyle(el);
    const ctx = fitReels._c || (fitReels._c = document.createElement('canvas').getContext('2d'));
    ctx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    $$('.reel', el).forEach((reel) => {
      const w = ctx.measureText(String(reel._target)).width;
      if (w) reel.style.width = (Math.ceil(w * 100) / 100) + 'px';
    });
  }
  function fitAllReels() { $$('.roll').forEach((el) => { if (el._built) fitReels(el); }); }
  window.addEventListener('resize', fitAllReels);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAllReels);
  function runRoll(el) {
    if (el._rolled) return; el._rolled = 1;
    buildRoll(el);
    $$('.reel', el).forEach((reel, idx) => {
      const col = reel.firstChild;
      if (reduce) { col.style.transform = `translateY(${-reel._target}em)`; return; }
      col.style.transform = 'translateY(0)';
      // extra spins for slot effect, staggered per digit
      setTimeout(() => { col.style.transform = `translateY(${-reel._target}em)`; }, 80 + idx * 130);
    });
  }
  $$('.roll').forEach(buildRoll);

  /* ---- sticky nav (top nav glass + mobile bar shadow) ---- */
  const topbar = $('.topbar');
  const topnav = $('.topnav');
  const onNavScroll = () => {
    if (topbar) topbar.style.boxShadow = window.scrollY > 20 ? '0 10px 30px -16px rgba(0,0,0,.6)' : 'none';
    if (topnav) topnav.classList.toggle('scrolled', window.scrollY > 24);
  };
  onNavScroll();
  window.addEventListener('scroll', onNavScroll, { passive: true });

  /* ---- reveal + counters + rolls (robust viewport check) ---- */
  function checkReveal() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    $$('.reveal:not(.in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
    });
    $$('.roll').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.85 && r.bottom > 0) runRoll(el);
    });
  }
  window.LO_checkReveal = checkReveal;
  checkReveal();
  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('resize', checkReveal);
  window.addEventListener('load', checkReveal);
  setTimeout(checkReveal, 200);

  /* ---- process step: replay icon animation on every cursor enter ---- */
  $$('.step').forEach((step) => {
    const svg = $('.dot svg', step);
    if (!svg) return;
    step.addEventListener('pointerenter', () => {
      svg.style.animation = 'none';
      void svg.offsetWidth; /* force reflow so the :hover animation restarts */
      svg.style.animation = '';
    });
  });

  /* ---- FAQ accordion ---- */
  $$('.faq-item').forEach((item) => {
    const q = $('.faq-q', item), a = $('.faq-a', item);
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      $$('.faq-item.open').forEach((o) => { o.classList.remove('open'); const oa = $('.faq-a', o); if (oa) oa.style.maxHeight = '0px'; });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ---- contact chips ---- */
  $$('.chip-toggle').forEach((c) => c.addEventListener('click', () => c.classList.toggle('on')));
  const form = $('#contactForm');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = $('.btn', form);
    if (btn) { btn.textContent = 'Thanks — I\'ll be in touch ✓'; btn.style.pointerEvents = 'none'; }
  });

  /* ---- testimonial carousel ---- */
  const qc = $('#qcarousel');
  if (qc) {
    const slides = $$('.qc-slide', qc);
    const viewport = $('.qc-viewport', qc);
    const dotsWrap = $('#qcDots');
    let idx = 0, timer = null;
    const DUR = 6000;

    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'qc-dot' + (i === 0 ? ' on' : '');
      b.setAttribute('aria-label', 'Quote ' + (i + 1));
      b.addEventListener('click', () => { go(i); restart(); });
      dotsWrap.appendChild(b);
    });
    const dots = $$('.qc-dot', dotsWrap);

    function setHeight() { if (viewport) viewport.style.height = slides[idx].offsetHeight + 'px'; }
    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('on', i === idx));
      requestAnimationFrame(setHeight);
    }
    function next() { go(idx + 1); }
    function prev() { go(idx - 1); }
    function restart() { if (timer) clearInterval(timer); if (!reduce) timer = setInterval(next, DUR); }

    $$('[data-qc]', qc).forEach((btn) => btn.addEventListener('click', () => {
      btn.dataset.qc === 'next' ? next() : prev(); restart();
    }));
    qc.addEventListener('mouseenter', () => { if (timer) clearInterval(timer); });
    qc.addEventListener('mouseleave', restart);

    setTimeout(setHeight, 60);
    window.addEventListener('resize', setHeight);
    window.addEventListener('load', () => setTimeout(setHeight, 100));
    restart();
  }

  /* ---- scrollspy for nav ---- */
  const navLinks = $$('.topnav-links a[data-sec]');
  if (navLinks.length) {
    const secs = navLinks.map(a => $('#' + a.dataset.sec)).filter(Boolean);
    const spy = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let active = secs[0];
      secs.forEach(s => { if (s.offsetTop <= y) active = s; });
      navLinks.forEach(a => a.classList.toggle('active', active && a.dataset.sec === active.id));
    };
    spy(); window.addEventListener('scroll', spy, { passive: true });
  }

  /* ---- HULY LIGHT MOTES (rising particles around the beam) ---- */
  const canvas = $('#starfield');
  if (canvas && !reduce) {
    const ctx = canvas.getContext('2d');
    let W, H, DPR, motes = [], mxn = 0, myn = 0, cxn = 0, cyn = 0;
    function spawn() {
      const beamX = W * 0.6;
      const spread = W * 0.42;
      return {
        x: beamX + (Math.random() - 0.5) * spread,
        y: H + Math.random() * 60,
        vy: -(Math.random() * 0.5 + 0.18),
        vx: (Math.random() - 0.5) * 0.18,
        z: Math.random() * 0.7 + 0.3,
        r: Math.random() * 1.6 + 0.5,
        tw: Math.random() * 6.28, tws: Math.random() * 0.7 + 0.25,
        cyan: Math.random() < 0.3,
        life: 0, max: H * (Math.random() * 0.6 + 0.5)
      };
    }
    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(120, Math.round(W * H / 11000)); motes = [];
      for (let i = 0; i < count; i++) { const m = spawn(); m.y = Math.random() * H; m.life = Math.random() * m.max; motes.push(m); }
    }
    resize(); window.addEventListener('resize', resize);
    const hero = $('.hero');
    if (hero) {
      hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); mxn = (e.clientX-r.left)/r.width-0.5; myn = (e.clientY-r.top)/r.height-0.5; });
      hero.addEventListener('pointerleave', () => { mxn = 0; myn = 0; });
    }
    function draw() {
      cxn += (mxn-cxn)*0.05; cyn += (myn-cyn)*0.05;
      const ox = -cxn*40, oy = -cyn*40;
      ctx.clearRect(0,0,W,H);
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.y += m.vy; m.x += m.vx; m.tw += m.tws*0.04; m.life++;
        if (m.y < -20 || m.life > m.max) { motes[i] = spawn(); continue; }
        const x = m.x + ox*m.z, y = m.y + oy*m.z;
        const fadeIn = Math.min(1, m.life/60), fadeOut = Math.min(1, (m.max-m.life)/90);
        const a = (0.5 + 0.5*Math.sin(m.tw)) * Math.min(fadeIn, fadeOut) * (0.45 + m.z*0.5);
        const col = m.cyan ? '255,180,120' : '255,150,90';
        ctx.beginPath(); ctx.arc(x, y, m.r, 0, 6.28); ctx.fillStyle = 'rgba('+col+','+a.toFixed(3)+')'; ctx.fill();
        if (m.z > 0.7) { ctx.beginPath(); ctx.arc(x, y, m.r*3.4, 0, 6.28); ctx.fillStyle = 'rgba('+col+','+(a*0.14).toFixed(3)+')'; ctx.fill(); }
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  if (reduce) return;

  /* ---- hero float-card parallax ---- */
  const hero = $('.hero');
  const layers = $$('[data-depth]');
  let mx = 0, my = 0, cx = 0, cy = 0, scrollY = 0;
  if (hero) {
    hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); mx = (e.clientX-r.left)/r.width-0.5; my = (e.clientY-r.top)/r.height-0.5; });
    hero.addEventListener('pointerleave', () => { mx = 0; my = 0; });
  }
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
  function raf() {
    cx += (mx-cx)*0.06; cy += (my-cy)*0.06;
    layers.forEach((el) => {
      const d = parseFloat(el.dataset.depth)||0, sp = parseFloat(el.dataset.scroll||0);
      const tx = -cx*d*46, ty = -cy*d*46 + scrollY*sp;
      const rot = el.dataset.rot ? ` rotate(${el.dataset.rot}deg)` : '';
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)${rot}`;
    });
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  /* ---- 3D tilt — cursor-skewed, with glare ---- */
  function bindTilt(scope) {
    if (window.matchMedia('(hover: none)').matches) return; // skip on touch
    (scope || document).querySelectorAll('[data-tilt]').forEach((card) => {
      if (card._tilt) return; card._tilt = 1;
      const max = parseFloat(card.dataset.tilt) || 12;
      let rafId = null, tx = 0, ty = 0, mx = 50, my = 50, active = false;
      const render = () => {
        rafId = null;
        card.style.transform = `perspective(820px) rotateX(${tx.toFixed(2)}deg) rotateY(${ty.toFixed(2)}deg) translateY(-8px) scale(1.012)`;
        card.style.setProperty('--mx', mx.toFixed(1) + '%');
        card.style.setProperty('--my', my.toFixed(1) + '%');
      };
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;   // 0..1
        const py = (e.clientY - r.top) / r.height;   // 0..1
        tx = -(py - 0.5) * max;          // tilt up/down from cursor Y
        ty =  (px - 0.5) * max;          // tilt left/right from cursor X
        mx = px * 100; my = py * 100;    // glare follows cursor
        if (!active) { active = true; card.classList.add('tilting'); }
        if (!rafId) rafId = requestAnimationFrame(render);
      });
      card.addEventListener('pointerleave', () => {
        active = false; card.classList.remove('tilting');
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        card.style.transform = '';
      });
    });
  }
  bindTilt(); window.LO_bindTilt = bindTilt;
})();
