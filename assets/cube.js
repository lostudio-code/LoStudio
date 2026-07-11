/* ============================================================
   LO STUDIO — Interactive 3D Rubik's Cube (hero)
   Auto-rotates · drag to spin · hover to pop ·
   CLICK A TILE to turn that face (real layer mechanics)
   ============================================================ */
(function () {
  'use strict';
  const cube = document.getElementById('rubik');
  const stageEl = document.getElementById('cubeStage');
  if (!cube || !stageEl) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const S = 62, GAP = 5, STEP = S + GAP, half = S / 2;

  /* ---------- tiny 4x4 matrix lib (row-major) ---------- */
  const ident = () => [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
  function mul(a, b) {
    const r = new Array(16);
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        r[i*4+j] = a[i*4]*b[j] + a[i*4+1]*b[4+j] + a[i*4+2]*b[8+j] + a[i*4+3]*b[12+j];
    return r;
  }
  function trans(x, y, z) { const m = ident(); m[3]=x; m[7]=y; m[11]=z; return m; }
  function rot(axis, deg) {
    const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), m = ident();
    if (axis === 0) { m[5]=c; m[6]=-s; m[9]=s; m[10]=c; }
    else if (axis === 1) { m[0]=c; m[2]=s; m[8]=-s; m[10]=c; }
    else { m[0]=c; m[1]=-s; m[4]=s; m[5]=c; }
    return m;
  }
  // row-major -> CSS matrix3d (column-major)
  function css(m) {
    return 'matrix3d(' +
      m[0]+','+m[4]+','+m[8]+','+m[12]+','+
      m[1]+','+m[5]+','+m[9]+','+m[13]+','+
      m[2]+','+m[6]+','+m[10]+','+m[14]+','+
      m[3]+','+m[7]+','+m[11]+','+m[15]+')';
  }
  const snap = (m) => m.map((v) => Math.round(v));
  const coordOf = (M) => [Math.round(M[3]/STEP), Math.round(M[7]/STEP), Math.round(M[11]/STEP)];

  /* ---------- build cubies ---------- */
  const FACES = [
    { t:`translateZ(${half}px)`,                 axis:2, val: 1, color:'red'    },
    { t:`rotateY(180deg) translateZ(${half}px)`, axis:2, val:-1, color:'orange' },
    { t:`rotateY(90deg) translateZ(${half}px)`,  axis:0, val: 1, color:'blue'   },
    { t:`rotateY(-90deg) translateZ(${half}px)`, axis:0, val:-1, color:'green'  },
    { t:`rotateX(90deg) translateZ(${half}px)`,  axis:1, val:-1, color:'white'  },
    { t:`rotateX(-90deg) translateZ(${half}px)`, axis:1, val: 1, color:'yellow' }
  ];

  const cubies = [];
  const frag = document.createDocumentFragment();
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;
        const el = document.createElement('div');
        el.className = 'cubie';
        const M = trans(x*STEP, y*STEP, z*STEP);
        el.style.transform = css(M);
        const inner = document.createElement('div');
        inner.className = 'cubie-inner';
        FACES.forEach((f) => {
          const face = document.createElement('div');
          face.className = 'cf';
          face.style.transform = f.t;
          const pos = f.axis === 0 ? x : f.axis === 1 ? y : z;
          if (pos === f.val) { face.classList.add('sticker', 's-' + f.color); face.dataset.ax = f.axis; }
          inner.appendChild(face);
        });
        el.appendChild(inner);
        const rec = { el, M };
        el.__rec = rec;
        cubies.push(rec);
        frag.appendChild(el);
      }
  cube.appendChild(frag);

  /* ---------- scramble to a mixed (unsolved) start ---------- */
  function turnInstant(axis, layerVal, dir) {
    const layer = cubies.filter((c) => coordOf(c.M)[axis] === layerVal);
    const Rf = rot(axis, 90 * dir);
    for (const c of layer) { c.M = snap(mul(Rf, c.M)); c.el.style.transform = css(c.M); }
  }
  (function scramble(n) {
    let lastAxis = -1;
    for (let i = 0; i < n; i++) {
      let axis; do { axis = Math.floor(Math.random() * 3); } while (axis === lastAxis);
      lastAxis = axis;
      const layerVal = Math.random() < 0.5 ? -1 : 1;
      const dir = Math.random() < 0.5 ? -1 : 1;
      turnInstant(axis, layerVal, dir);
    }
  })(20);

  /* ---------- global spin (idle + drag) ---------- */
  let rx = -26, ry = -34, vry = 0.34, vrx = 0;
  let dragging = false, lx = 0, ly = 0, downX = 0, downY = 0, moved = 0, downFace = null;
  const BASE_SPIN = 0.34, REST_RX = -26;
  let spinHold = 0; // frames to pause idle spin after interaction
  function applySpin() { cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; }
  applySpin();

  /* ---------- face turn animation ---------- */
  let busy = false;
  function turn(axis, layerVal, dir) {
    if (busy) return;
    busy = true; spinHold = 90;
    const layer = cubies.filter((c) => coordOf(c.M)[axis] === layerVal);
    const start = layer.map((c) => c.M);
    const target = 90 * dir;
    const dur = reduce ? 0 : 360, t0 = performance.now();
    function frame(now) {
      let p = dur ? Math.min(1, (now - t0) / dur) : 1;
      const e = 1 - Math.pow(1 - p, 3);            // easeOutCubic
      const R = rot(axis, target * e);
      for (let i = 0; i < layer.length; i++) layer[i].el.style.transform = css(mul(R, start[i]));
      if (p < 1) { requestAnimationFrame(frame); }
      else {
        const Rf = rot(axis, target);
        for (let i = 0; i < layer.length; i++) {
          layer[i].M = snap(mul(Rf, start[i]));
          layer[i].el.style.transform = css(layer[i].M);
        }
        busy = false;
      }
    }
    requestAnimationFrame(frame);
  }

  /* ---------- pointer: drag to spin, click a tile to turn ---------- */
  stageEl.addEventListener('pointerdown', (e) => {
    dragging = true; moved = 0;
    lx = downX = e.clientX; ly = downY = e.clientY;
    downFace = e.target.closest('.cf.sticker');
    stageEl.classList.add('grabbing');
    try { stageEl.setPointerCapture(e.pointerId); } catch (_) {}
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lx, dy = e.clientY - ly;
    lx = e.clientX; ly = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    ry += dx * 0.45; rx -= dy * 0.45;
    rx = Math.max(-88, Math.min(88, rx));
    vry = dx * 0.45; vrx = -dy * 0.45;
    spinHold = 30;
    applySpin();
  });
  function endDrag(e) {
    if (!dragging) return;
    dragging = false; stageEl.classList.remove('grabbing');
    // treat as a click if the pointer barely moved and landed on a sticker
    if (moved < 7 && downFace && downFace.classList.contains('sticker')) {
      const axis = parseInt(downFace.dataset.ax, 10);
      const rec = downFace.closest('.cubie').__rec;
      const layerVal = coordOf(rec.M)[axis];
      const dir = (e && (e.shiftKey || e.altKey)) ? -1 : 1;
      turn(axis, layerVal, dir);
    }
  }
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', () => { dragging = false; stageEl.classList.remove('grabbing'); });

  /* ---------- idle loop ---------- */
  function loop() {
    if (!dragging && !reduce) {
      if (spinHold > 0) spinHold--;
      else {
        vry += (BASE_SPIN - vry) * 0.02;
        vrx += (0 - vrx) * 0.05;
        ry += vry;
        rx += vrx + (REST_RX - rx) * 0.006;
        applySpin();
      }
    }
    if (cubeVisible) cubeRaf = requestAnimationFrame(loop); else cubeRaf = null;
  }
  let cubeVisible = true, cubeRaf = null;
  function startCube() { if (!cubeRaf && cubeVisible) cubeRaf = requestAnimationFrame(loop); }
  if (stageEl && 'IntersectionObserver' in window) {
    new IntersectionObserver((ents) => { cubeVisible = ents[0].isIntersecting; if (cubeVisible) startCube(); }).observe(stageEl);
  }
  startCube();
})();
