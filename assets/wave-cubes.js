/* ============================================================
   LO STUDIO — 3D Wavy Cube Field (voltage grid)
   Renders an animated instanced-cube wave into #waveCubes.
   Transparent canvas; bails cleanly if THREE or canvas absent.
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

  /* ---- cube field ---- */
  const N = 26;                // grid is N x N
  const SP = 1.15;             // spacing
  const SIZE = 0.82;           // cube footprint
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

  const AMP = 2.1;             // wave height
  const FREQ = 0.55;           // spatial frequency
  const SPEED = 0.0016;        // time scale

  function frame(t) {
    let i = 0;
    for (let gx = 0; gx < N; gx++) {
      for (let gz = 0; gz < N; gz++, i++) {
        const x = gx * SP - off;
        const z = gz * SP - off;
        const d = Math.sqrt(x * x + z * z);
        const w = Math.sin(d * FREQ - t * SPEED) + 0.5 * Math.sin(x * 0.3 + t * SPEED * 0.7);
        const y = w * AMP;
        dummy.position.set(x, y, z);
        const s = 0.9 + (w + 1.5) * 0.14;
        dummy.scale.set(1, s, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        const h = (w + 1.6) / 3.2;           // 0..1
        if (h < 0.5) tmp.copy(cDark).lerp(cMid, h * 2);
        else tmp.copy(cMid).lerp(cVolt, (h - 0.5) * 2);
        mesh.setColorAt(i, tmp);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    renderer.render(scene, camera);
  }

  function resize() {
    const w = canvas.clientWidth || canvas.parentElement.clientWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* pause when off-screen to save battery */
  let running = true, raf = null;
  function loop(now) { frame(now); if (running) raf = requestAnimationFrame(loop); }
  if (reduce) {
    frame(4200);                 // one static, pleasing frame
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => {
      running = es[0].isIntersecting;
      if (running && !raf) raf = requestAnimationFrame(loop);
      else if (!running && raf) { cancelAnimationFrame(raf); raf = null; }
    }, { threshold: 0.01 });
    io.observe(canvas);
    raf = requestAnimationFrame(loop);
  } else {
    raf = requestAnimationFrame(loop);
  }
})();
