/* Butterfly perched on the hero CTA — neon wings keyed to the hero cube palette.
   Flies off on hover, returns a moment later. */
(function () {
  var mq = window.matchMedia;
  if (mq('(prefers-reduced-motion: reduce)').matches) return;
  if (mq('(hover: none)').matches || mq('(max-width: 620px)').matches) return;
  function init() {
    if (!window.THREE) return;
    document.querySelectorAll('.bf-host').forEach(mount);
  }
  function mount(host) {
    var THREE = window.THREE, btn = host.querySelector('.btn');
    if (!btn) return;
    var canvas = document.createElement('canvas');
    canvas.className = 'bf-canvas';
    host.appendChild(canvas);

    var W = 420, H = 280, renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch (e) { canvas.remove(); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H, false);
    var scene = new THREE.Scene();
    var cam = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -400, 400);
    cam.position.z = 200;
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    var key = new THREE.DirectionalLight(0xffffff, 0.7);
    key.position.set(-40, 70, 120);
    scene.add(key);

    /* --- track every material so the fade in/out can drive them together --- */
    var mats = [];
    function reg(m, base) { m.transparent = true; mats.push({ m: m, o: base }); return m; }

    function wingShape(pts) {
      var s = new THREE.Shape();
      s.moveTo(0, 0);
      for (var i = 0; i < pts.length; i++) s.bezierCurveTo.apply(s, pts[i]);
      s.closePath();
      return new THREE.ShapeGeometry(s, 28);
    }
    /* gradient across the wing span, inner colour -> tip colour */
    function tint(geo, a, b) {
      var p = geo.attributes.position, n = p.count, min = Infinity, max = -Infinity, i, x;
      for (i = 0; i < n; i++) { x = p.getX(i); if (x < min) min = x; if (x > max) max = x; }
      var ca = new THREE.Color(a), cb = new THREE.Color(b), t = new THREE.Color(), arr = new Float32Array(n * 3);
      for (i = 0; i < n; i++) {
        t.copy(ca).lerp(cb, (p.getX(i) - min) / (max - min || 1));
        arr[i * 3] = t.r; arr[i * 3 + 1] = t.g; arr[i * 3 + 2] = t.b;
      }
      geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
      return geo;
    }
    var foreGeo = tint(wingShape([[4, 14, 16, 26, 25, 19], [30, 14, 26, 4, 15, 1], [9, 0, 4, 0, 0, 0]]), 0xd9f400, 0xff9436);
    var hindGeo = tint(wingShape([[6, -6, 18, -8, 19, -15], [20, -22, 12, -21, 7, -14], [4, -9, 2, -4, 0, 0]]), 0xd9f400, 0xff9436);
    var foreEdge = new THREE.EdgesGeometry(foreGeo), hindEdge = new THREE.EdgesGeometry(hindGeo);
    var darkMat = reg(new THREE.MeshLambertMaterial({ color: 0x14161d, side: THREE.DoubleSide }), 1);

    /* radial bloom sprite, sits behind the butterfly */
    function bloomTex(hex) {
      var c = document.createElement('canvas'); c.width = c.height = 128;
      var g = c.getContext('2d').createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, hex); g.addColorStop(0.35, hex.replace(')', ',.35)').replace('rgb', 'rgba')); g.addColorStop(1, 'rgba(0,0,0,0)');
      var ctx = c.getContext('2d'); ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    }

    var bf = new THREE.Group();
    var glow = new THREE.Mesh(new THREE.PlaneGeometry(120, 100),
      reg(new THREE.MeshBasicMaterial({ map: bloomTex('rgb(190,255,120)'), blending: THREE.AdditiveBlending, depthWrite: false }), 0.34));
    glow.position.z = -6;
    bf.add(glow);

    var body = new THREE.Mesh(new THREE.CapsuleGeometry(1.5, 13, 3, 10), darkMat);
    bf.add(body);
    var head = new THREE.Mesh(new THREE.SphereGeometry(2.2, 12, 10), darkMat);
    head.position.y = 8.6;
    bf.add(head);
    var thoraxMat = reg(new THREE.MeshBasicMaterial({ color: 0xd9f400, blending: THREE.AdditiveBlending, depthWrite: false }), 0.75);
    var thorax = new THREE.Mesh(new THREE.SphereGeometry(2.6, 12, 10), thoraxMat);
    thorax.scale.set(0.7, 1.5, 0.7);
    thorax.position.y = 3.4;
    bf.add(thorax);
    [-1, 1].forEach(function (d) {
      var a = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 11, 5), darkMat);
      a.position.set(d * 2.2, 13.4, 0.4);
      a.rotation.z = d * 0.34;
      bf.add(a);
      var tip = new THREE.Mesh(new THREE.SphereGeometry(0.85, 8, 6),
        reg(new THREE.MeshBasicMaterial({ color: 0x6391ff, blending: THREE.AdditiveBlending, depthWrite: false }), 0.95));
      tip.position.set(d * 4.1, 18.4, 0.8);
      bf.add(tip);
    });

    /* each wing: saturated fill + additive halo one size up + glowing rim */
    function wingSet(geo, edge, rim) {
      var g = new THREE.Group();
      g.add(new THREE.Mesh(geo, reg(new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide }), 0.9)));
      var halo = new THREE.Mesh(geo, reg(new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }), 0.4));
      halo.scale.set(1.14, 1.14, 1); halo.position.z = -1.5;
      g.add(halo);
      var line = new THREE.LineSegments(edge, reg(new THREE.LineBasicMaterial({ color: rim, blending: THREE.AdditiveBlending, depthWrite: false }), 0.9));
      line.position.z = 0.4;
      g.add(line);
      return g;
    }
    var wings = [-1, 1].map(function (d) {
      var g = new THREE.Group();
      var f = wingSet(foreGeo, foreEdge, 0xfaff9e), h = wingSet(hindGeo, hindEdge, 0xfaff9e);
      f.position.y = 2; h.position.y = 1; h.position.z = -0.6;
      g.add(f); g.add(h);
      g.scale.x = d;
      g.position.x = d * 1.2;
      bf.add(g);
      return g;
    });
    scene.add(bf);

    var s = parseFloat(host.getAttribute('data-bf-scale')) || 1;
    bf.scale.setScalar(s);
    /* the arc must stay inside whatever clips this button (hero / footer both use overflow:hidden) */
    function clipRect(el) {
      var n = el.parentElement;
      while (n && n !== document.documentElement) {
        var st = getComputedStyle(n);
        if (st.overflow !== 'visible' || st.overflowX !== 'visible') return n.getBoundingClientRect();
        n = n.parentElement;
      }
      return { left: 0, right: window.innerWidth, top: 0 };
    }
    var flip = false;
    var perch = { x: -102, y: 0 };
    var exit = { x: 118, y: 92 };
    var liftOut = 70, liftIn = 80;
    function place() {
      var hr = host.getBoundingClientRect(), cb = clipRect(host);
      /* horizontal: fly the other way when there is no room to the right */
      flip = (hr.left - 34 + W) > (cb.right - 4) && (hr.right + 34 - W) >= (cb.left - 4);
      canvas.style.left = flip ? 'auto' : '-34px';
      canvas.style.right = flip ? '-34px' : 'auto';
      perch.x = flip ? 102 : -102;
      /* vertical: never let the canvas reach above the clipping ancestor */
      H = Math.max(130, Math.min(280, Math.floor(hr.top + 6 - cb.top)));
      canvas.style.height = H + 'px';
      renderer.setSize(W, H, false);
      cam.top = H / 2; cam.bottom = -H / 2; cam.updateProjectionMatrix();
      var margin = 38 * s + 8;
      var limit = H / 2 - margin;
      perch.y = -H / 2 + 5 + 8 * s;
      exit.x = (flip ? -118 : 118);
      exit.y = Math.min(92, limit);
      var maxLift = Math.max(12, limit - perch.y - (exit.y - perch.y) * 0.1);
      liftOut = Math.min(70, maxLift);
      liftIn = Math.min(80, maxLift);
    }
    place();
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(place, 200); });
    bf.position.set(perch.x, perch.y, 0);

    var state = 'perched', t0 = 0, returnAt = 0, hovering = false;
    var DUR_OUT = 1500, DUR_IN = 1900, DELAY = 1400;
    function ease(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
    function path(p, from, to, lift) {
      var cx = from.x + (to.x - from.x) * 0.28, cy = from.y + (to.y - from.y) * 0.1 + lift;
      var m = 1 - p;
      return { x: m * m * from.x + 2 * m * p * cx + p * p * to.x, y: m * m * from.y + 2 * m * p * cy + p * p * to.y };
    }

    /* pause rendering when the button is off-screen or the tab is hidden */
    var visible = true, running = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
        if (visible) kick();
      }, { rootMargin: '120px' }).observe(host);
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });
    function kick() { if (!running && visible && !document.hidden) { running = true; start = performance.now() - 1; requestAnimationFrame(frame); } }

    var start = performance.now();
    function frame(now) {
      if (!visible || document.hidden) { running = false; return; }
      var el = (now - start) / 1000, flap, tilt = 0, pos = null, op = 1;
      if (state === 'perched') {
        var pulse = Math.max(0, Math.sin(el * 0.7)) * Math.max(0, Math.sin(el * 2.6));
        flap = 0.14 + pulse * 0.5;
        bf.position.y = perch.y + Math.sin(el * 1.6) * 0.5;
        bf.position.x = perch.x;
        tilt = Math.sin(el * 0.9) * 0.05;
      } else if (state === 'leaving' || state === 'returning') {
        var out = state === 'leaving';
        var p = Math.min(1, (now - t0) / (out ? DUR_OUT : DUR_IN));
        var e = ease(p);
        pos = out ? path(e, perch, exit, liftOut) : path(e, exit, perch, liftIn);
        bf.position.x = pos.x + Math.sin(el * 7) * 3;
        var fx = flip ? -1 : 1;
        bf.position.y = pos.y + Math.cos(el * 5.5) * 2.5;
        flap = 0.95 + Math.sin(el * 26) * 0.55;
        tilt = ((out ? -0.5 : 0.42) + Math.sin(el * 6) * 0.12) * fx;
        op = out ? (p > 0.52 ? Math.max(0, 1 - (p - 0.52) / 0.4) : 1) : (p < 0.34 ? p / 0.34 : 1);
        if (p >= 1) {
          if (out) { state = 'gone'; returnAt = now + DELAY; }
          else { state = 'perched'; start = now; }
        }
      } else {
        flap = 0;
        op = 0;
        if (!hovering && now >= returnAt) { state = 'returning'; t0 = now; }
      }
      wings[0].rotation.y = flap;
      wings[1].rotation.y = -flap;
      bf.rotation.x = -0.55 + (state === 'perched' ? 0 : 0.35);
      bf.rotation.z = tilt;
      glow.material.opacity = 0.34 * op * (0.75 + Math.abs(Math.sin(el * 2.2)) * 0.35);
      for (var i = 0; i < mats.length; i++) {
        if (mats[i].m !== glow.material) mats[i].m.opacity = mats[i].o * op;
      }
      renderer.render(scene, cam);
      requestAnimationFrame(frame);
    }
    running = true;
    requestAnimationFrame(frame);
    canvas.classList.add('is-ready');

    btn.addEventListener('mouseenter', function () {
      hovering = true;
      if (state === 'perched') { state = 'leaving'; t0 = performance.now(); }
      else if (state === 'returning') { state = 'gone'; returnAt = performance.now() + DELAY; }
    });
    btn.addEventListener('mouseleave', function () {
      hovering = false;
      if (state === 'gone') returnAt = Math.min(returnAt, performance.now() + DELAY);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
