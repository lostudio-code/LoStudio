/* ============================================================
   LO STUDIO — 3D Wavy Cube Field (hero background)
   Instanced grid of cubes undulating in a sine wave.
   Palette: dark #141414 base, volt #D9F400 crests.
   ============================================================ */
(function () {
  'use strict';
  if (!window.THREE) return;
  const canvas = document.getElementById('waveCubes');
  if (!canvas) return;
  const THREE = window.THREE;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x141414, 26, 62);

  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 200);
  camera.position.set(0, 15.5, 25);
  camera.lookAt(0, -1.5, 0);

  /* ---- lights ---- */
  scene.add(new THREE.AmbientLight(0x2a2c1a, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(-8, 18, 10);
  scene.add(key);
  const volt = new THREE.PointLight(0xD9F400, 2.4, 60, 2);
  volt.position.set(4, 9, 6);
  scene.add(volt);
  const rim = new THREE.DirectionalLight(0xaec700, 0.5);
  rim.position.set(10, 6, -12);
  scene.add(rim);

  /* ---- cube grid ---- */
  const N = 42;                 // grid per side
  const SP = 1.12;              // spacing
  const SIZE = 0.82;            // cube footprint
  const COUNT = N * N;
  const geo = new THREE.BoxGeometry(SIZE, SIZE, SIZE);
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.42, metalness: 0.28, vertexColors: false });
  const mesh = new THREE.InstancedMesh(geo, mat, COUNT);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(COUNT * 3), 3);
  scene.add(mesh);

  const dummy = new THREE.Object3D();
  const cDark = new THREE.Color(0x1b1c14);
  const cMid = new THREE.Color(0x3a3d16);
  const cVolt = new THREE.Color(0xD9F400);
  const tmp = new THREE.Color();
  const off = (N - 1) * SP / 2;

  // precompute per-instance base position + radial distance
  const px = new Float32Array(COUNT), pz = new Float32Array(COUNT), pd = new Float32Array(COUNT);
  let k = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const x = i * SP - off, z = j * SP - off;
      px[k] = x; pz[k] = z; pd[k] = Math.sqrt(x * x + z * z);
      k++;
    }
  }

  function wave(t) {
    for (let n = 0; n < COUNT; n++) {
      const x = px[n], z = pz[n], d = pd[n];
      // layered sine for organic undulation
      const h = Math.sin(x * 0.42 + t) * 1.15
              + Math.cos(z * 0.5 - t * 0.8) * 1.0
              + Math.sin(d * 0.6 - t * 1.4) * 1.25;
      const y = h;
      const sy = 0.5 + (h + 3.4) * 0.5;             // taller cubes on crests
      dummy.position.set(x, y, z);
      dummy.scale.set(1, Math.max(0.28, sy), 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(n, dummy.matrix);
      // color: dark valleys -> volt crests
      const norm = Math.min(1, Math.max(0, (h + 3.4) / 6.8));
      if (norm < 0.62) { tmp.copy(cDark).lerp(cMid, norm / 0.62); }
      else { tmp.copy(cMid).lerp(cVolt, (norm - 0.62) / 0.38); }
      mesh.setColorAt(n, tmp);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }

  /* ---- resize ---- */
  function resize() {
    const w = canvas.clientWidth || canvas.parentElement.clientWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  /* ---- render loop (pause offscreen) ---- */
  let visible = true, raf = null;
  const heroEl = canvas.closest('.hero') || canvas.parentElement;
  if ('IntersectionObserver' in window && heroEl) {
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) start(); })
      .observe(heroEl);
  }

  const t0 = performance.now();
  function frame() {
    const t = reduce ? 4.2 : (performance.now() - t0) / 1000 * 0.62;
    wave(t);
    // gentle drift of the volt light for shimmer
    if (!reduce) { volt.position.x = Math.cos(t * 0.5) * 7; volt.position.z = Math.sin(t * 0.5) * 7 + 3; }
    renderer.render(scene, camera);
    if (reduce) { raf = null; return; }
    raf = visible ? requestAnimationFrame(frame) : null;
  }
  function start() { if (!raf) raf = requestAnimationFrame(frame); }
  start();
})();
