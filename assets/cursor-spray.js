/* Cursor spray — the pointer lifts a trail of floating pixels.
   Ported from the Sylva hero: emission is by DISTANCE rather than by time and
   is spread along the segment the pointer covered since the last frame, so a
   fast sweep lays a trail instead of stacking a clump where the cursor landed,
   and a pointer that has stopped trickles instead of pumping. Each grain
   carries its own origin, velocity and birth stamp, so the CPU only writes
   when one is respawned out of the ring — the flight is integrated in the
   vertex shader. */
(function () {
  var mq = window.matchMedia;
  if (mq('(prefers-reduced-motion: reduce)').matches) return;
  if (mq('(hover: none)').matches || mq('(pointer: coarse)').matches) return;

  function init() {
    if (!window.THREE) return;
    var THREE = window.THREE;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9;';
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch (e) { return; }
    document.body.appendChild(canvas);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); running = false; canvas.remove(); }, false);

    var W = 1, H = 1;
    var scene = new THREE.Scene();
    var cam = new THREE.OrthographicCamera(-1, 1, 1, -1, -1000, 1000);
    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      renderer.setSize(W, H, false);
      cam.left = -W / 2; cam.right = W / 2; cam.top = H / 2; cam.bottom = -H / 2;
      cam.updateProjectionMatrix();
    }
    resize();
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { resize(); measureZone(); }, 150); });

    var rng = (function () {
      var a = 0x3f9a1c7b;
      return function () {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    })();
    function rand(lo, hi) { return lo + (hi - lo) * rng(); }

    function radialTexture(size, stops) {
      var c = document.createElement('canvas'); c.width = c.height = size;
      var g = c.getContext('2d');
      var grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      stops.forEach(function (s) { grad.addColorStop(s[0], s[1]); });
      g.fillStyle = grad; g.fillRect(0, 0, size, size);
      var t = new THREE.CanvasTexture(c);
      t.minFilter = THREE.LinearFilter;
      if ('sRGBEncoding' in THREE) t.encoding = THREE.sRGBEncoding;
      return t;
    }
    /* volt core falling off to the site's link colour */
    var grainTex = radialTexture(64, [[0, 'rgba(255,255,255,1)'], [0.35, 'rgba(217,244,0,0.5)'], [1, 'rgba(217,244,0,0)']]);

    var N = 620, LIFE = 1.6;
    var uTime = { value: 0 };
    var pos = new Float32Array(N * 3), vel = new Float32Array(N * 3),
      birth = new Float32Array(N), rnd = new Float32Array(N * 2);
    for (var i = 0; i < N; i++) birth[i] = -999;

    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aVel', new THREE.BufferAttribute(vel, 3));
    geo.setAttribute('aBirth', new THREE.BufferAttribute(birth, 1));
    geo.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 2));

    var points = new THREE.Points(geo, new THREE.ShaderMaterial({
      uniforms: { uTime: uTime, uMap: { value: grainTex }, uSize: { value: 13 }, uLife: { value: LIFE } },
      transparent: true, depthWrite: false, depthTest: false,
      blending: THREE.AdditiveBlending,
      vertexShader: [
        'attribute vec3 aVel;', 'attribute float aBirth;', 'attribute vec2 aRnd;',
        'uniform float uTime, uSize, uLife;', 'varying float vA;',
        'void main(){',
        '  float age = uTime - aBirth;',
        '  if (age < 0.0 || age > uLife) { vA = 0.0; gl_PointSize = 0.0; gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }',
        '  float u = age / uLife;',
        /* drag on the launch velocity, a slow lift, and a little wander */
        '  vec3 p = position + aVel * age * (1.0 - 0.34 * u)',
        '         + vec3(sin(aRnd.y * 6.28 + age * 2.6) * 22.0 * u, 46.0 * age, 0.0);',
        '  gl_PointSize = uSize * aRnd.x * (0.45 + 0.55 * (1.0 - u));',
        '  vA = smoothstep(0.0, 0.09, u) * (1.0 - smoothstep(0.40, 1.0, u));',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);',
        '}'
      ].join('\n'),
      fragmentShader: [
        'precision highp float;', 'uniform sampler2D uMap;', 'varying float vA;',
        'void main(){',
        '  vec4 t = texture2D(uMap, gl_PointCoord);',
        '  gl_FragColor = vec4(t.rgb, t.a * vA * 0.85);',
        '}'
      ].join('\n')
    }));
    points.frustumCulled = false;
    scene.add(points);

    /* --- the trail lives in the hero band only: from the top of the hero to
       the bottom of the marquee. Emission is gated to that band and the canvas
       is clipped to it, so grains never drift past the scrolling text. --- */
    var zoneEls = ['.hero', '.marquee'].map(function (q) { return document.querySelector(q); }).filter(Boolean);
    var zone = { top: 0, bottom: 0 }, zoneAt = 0;
    function measureZone() {
      if (!zoneEls.length) { zone.top = 0; zone.bottom = 0; return; }
      var top = Infinity, bottom = -Infinity;
      zoneEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < top) top = r.top;
        if (r.bottom > bottom) bottom = r.bottom;
      });
      zone.top = top; zone.bottom = bottom;
      canvas.style.clipPath = 'inset(' + Math.max(0, top) + 'px 0 ' + Math.max(0, H - bottom) + 'px 0)';
    }
    function inZone(clientY) { return clientY >= zone.top && clientY <= zone.bottom; }
    measureZone();
    var scrollQ = false;
    window.addEventListener('scroll', function () {
      if (scrollQ) return;
      scrollQ = true;
      requestAnimationFrame(function () { scrollQ = false; measureZone(); });
    }, { passive: true });

    var head = 0, dirty = false;
    function spawn(x, y, boost) {
      var k = boost || 1;
      var i = head; head = (head + 1) % N;
      var o = i * 3;
      pos[o] = x + rand(-15, 15) * k;
      pos[o + 1] = y + rand(-15, 15) * k;
      pos[o + 2] = 0;
      vel[o] = rand(-38, 38) * k;
      vel[o + 1] = (rand(2, 64) + 22 * (k - 1)) * k;
      vel[o + 2] = 0;
      birth[i] = uTime.value;
      rnd[i * 2] = rand(0.50, 1.15);
      rnd[i * 2 + 1] = rng();
      dirty = true;
    }
    function flush() {
      if (!dirty) return;
      var at = geo.attributes;
      at.position.needsUpdate = at.aVel.needsUpdate = at.aBirth.needsUpdate = at.aRnd.needsUpdate = true;
      dirty = false;
    }

    var live = false, atX = 0, atY = 0, lastX = 9999, lastY = 0, idle = 0, lastEmit = 0;
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      measureZone();
      atX = e.clientX - W / 2; atY = H / 2 - e.clientY;
      if (!inZone(e.clientY)) { live = false; lastX = 9999; return; }
      live = true;
      kick();
    }, { passive: true });
    window.addEventListener('pointerdown', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      measureZone();
      if (!inZone(e.clientY)) return;
      atX = e.clientX - W / 2; atY = H / 2 - e.clientY;
      live = true;
      for (var b = 0; b < 52; b++) spawn(atX, atY, 2.5);
      flush();
      kick();
    }, { passive: true });
    document.addEventListener('mouseleave', function () { live = false; lastX = 9999; });
    window.addEventListener('blur', function () { live = false; lastX = 9999; });

    function emit(dt) {
      if (!live) { lastX = 9999; return; }            /* re-entering should not lay a streak */
      if (lastX > 9000) { lastX = atX; lastY = atY; return; }
      var dx = atX - lastX, dy = atY - lastY, d = Math.sqrt(dx * dx + dy * dy);
      var n = Math.min(14, Math.floor(d / 7));
      for (var k = 1; k <= n; k++) spawn(lastX + dx * (k / n), lastY + dy * (k / n), 1);
      if (n > 0) { lastX = atX; lastY = atY; idle = 0; lastEmit = uTime.value; }
      else {
        idle += dt;
        if (idle > 0.055) { spawn(atX, atY, 1); idle = 0; lastEmit = uTime.value; }
      }
      flush();
    }

    var running = false, prev = 0;
    function kick() { if (!running && !document.hidden) { running = true; prev = performance.now(); requestAnimationFrame(frame); } }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });

    function frame(now) {
      if (document.hidden) { running = false; return; }
      var dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      uTime.value += dt;
      if (now - zoneAt > 120) { zoneAt = now; measureZone(); }
      emit(dt);
      renderer.render(scene, cam);
      /* idle down once the last grain has expired */
      if (!live && uTime.value - lastEmit > LIFE + 0.2) { running = false; return; }
      requestAnimationFrame(frame);
    }
    kick();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
