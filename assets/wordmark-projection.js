/* Lo Studio footer — cube-swarm logo (Codrops video-projection rig, no video).
   Default: cubes scattered and drifting. Hover: they resolve into the logo. */
(function () {
  var wrap = document.querySelector('.wordmark[data-video]');
  if (!wrap || !window.THREE) return;
  var stage = wrap.querySelector('.wm-stage');
  var logoSrc = wrap.getAttribute('data-logo');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var THREE = window.THREE;

  var COLS = 168, ROWS = 26;

  var started = false;
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (e) { if (e.isIntersecting && !started) { started = true; io.disconnect(); init(); } });
  }, { rootMargin: '200px' });
  io.observe(wrap);

  function sampleLogo(img) {
    var c = document.createElement('canvas');
    c.width = COLS; c.height = ROWS;
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, COLS, ROWS);
    var d = ctx.getImageData(0, 0, COLS, ROWS).data;
    var cells = [];
    for (var j = 0; j < ROWS; j++) {
      for (var i = 0; i < COLS; i++) {
        var a = d[(j * COLS + i) * 4 + 3] / 255;
        if (a > 0.34) cells.push([i, j]);
      }
    }
    return cells;
  }

  function init() {
    var logo = new Image();
    logo.crossOrigin = 'anonymous';
    logo.onload = function () { build(sampleLogo(logo)); };
    logo.src = logoSrc;
  }

  function build(cells) {
    if (!cells.length) return;

    var w = stage.clientWidth || 900;
    var h = w * 104 / 692;

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    renderer.setClearColor(0x000000, 0);
    var canvas = renderer.domElement;
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 1.4s ease';
    stage.appendChild(canvas);

    var scene = new THREE.Scene();
    var fov = 26;
    var dist = (ROWS / 2) / Math.tan((fov / 2) * Math.PI / 180) * 1.14;
    var camera = new THREE.PerspectiveCamera(fov, COLS / ROWS, 0.1, 2000);
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0, 0);

    var step = 1.0, size = 0.84;
    var geo = new THREE.BoxGeometry(size, size, size);
    var n = cells.length;
    var aScatter = new Float32Array(n * 3);
    var aAxis = new Float32Array(n * 3);
    var aRand = new Float32Array(n);

    var mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uAssemble: { value: 0 },
        uVolt: { value: new THREE.Color(0xD9F400) },
        uWhite: { value: new THREE.Color(0xf2f2ee) }
      },
      vertexShader: [
        'attribute vec3 aScatter;',
        'attribute vec3 aAxis;',
        'attribute float aRand;',
        'uniform float uTime;',
        'uniform float uAssemble;',
        'varying float vShade;',
        'varying float vRand;',
        'vec3 rotAxis(vec3 p, vec3 axis, float a){',
        '  axis = normalize(axis); float s = sin(a), c = cos(a);',
        '  return p * c + cross(axis, p) * s + axis * dot(axis, p) * (1.0 - c);',
        '}',
        'void main(){',
        '  vRand = aRand;',
        '  float dis = 1.0 - uAssemble;',
        '  float ang = dis * (aRand * 6.2831 * 2.0 + uTime * 0.9);',
        '  vec3 local = rotAxis(position, aAxis, ang);',
        '  vec4 ip = instanceMatrix * vec4(local, 1.0);',
        '  vec3 drift = vec3(sin(uTime*0.8 + aRand*10.0), cos(uTime*0.7 + aRand*8.0), sin(uTime*0.9 + aRand*6.0)) * (0.5 * dis);',
        '  ip.xyz += aScatter * dis + drift;',
        '  vec3 nn = normalize(mat3(instanceMatrix) * rotAxis(normal, aAxis, ang));',
        '  vShade = clamp(0.5 + 0.5 * nn.z, 0.0, 1.0);',
        '  gl_Position = projectionMatrix * modelViewMatrix * ip;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'precision highp float;',
        'uniform vec3 uVolt;',
        'uniform vec3 uWhite;',
        'varying float vShade;',
        'varying float vRand;',
        'void main(){',
        '  vec3 base = mix(uWhite, uVolt, smoothstep(0.55, 1.0, vRand));',
        '  gl_FragColor = vec4(base * (0.32 + 0.68 * vShade), 1.0);',
        '}'
      ].join('\n')
    });

    var mesh = new THREE.InstancedMesh(geo, mat, n);
    var dummy = new THREE.Object3D();
    for (var k = 0; k < n; k++) {
      var i = cells[k][0], j = cells[k][1];
      dummy.position.set((i - (COLS - 1) / 2) * step, ((ROWS - 1) / 2 - j) * step, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(k, dummy.matrix);
      aScatter[k * 3] = (Math.random() - 0.5) * 3.4;
      aScatter[k * 3 + 1] = (Math.random() - 0.5) * 3.4;
      aScatter[k * 3 + 2] = (Math.random() - 0.5) * 7.0 + 1.5;
      aAxis[k * 3] = Math.random() * 2 - 1;
      aAxis[k * 3 + 1] = Math.random() * 2 - 1;
      aAxis[k * 3 + 2] = Math.random() * 2 - 1;
      aRand[k] = Math.random();
    }
    mesh.instanceMatrix.needsUpdate = true;
    geo.setAttribute('aScatter', new THREE.InstancedBufferAttribute(aScatter, 3));
    geo.setAttribute('aAxis', new THREE.InstancedBufferAttribute(aAxis, 3));
    geo.setAttribute('aRand', new THREE.InstancedBufferAttribute(aRand, 1));
    scene.add(mesh);

    var target = 0, cur = 0, hovering = false;
    stage.addEventListener('pointerenter', function () { hovering = true; target = 1; });
    stage.addEventListener('pointerleave', function () { hovering = false; target = 0; });

    wrap.classList.add('is-live');

    // Intro: fade the bits in and build the logo once, then let them float apart.
    var introDone = false;
    var iio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !introDone) {
          introDone = true; iio.disconnect();
          canvas.style.opacity = '1';
        }
      });
    }, { threshold: 0.4 });
    iio.observe(wrap);

    function resize() {
      var nw = stage.clientWidth || w;
      var nh = nw * 104 / 692;
      renderer.setSize(nw, nh, false);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);

    var visible = true;
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { visible = e.isIntersecting; });
    }, { threshold: 0.01 });
    vio.observe(wrap);

    var t0 = performance.now();
    function frame(now) {
      requestAnimationFrame(frame);
      if (!visible) return;
      var t = (now - t0) / 1000;
      cur += (target - cur) * 0.07;
      mat.uniforms.uTime.value = reduce ? 0 : t;
      mat.uniforms.uAssemble.value = reduce ? 1 : cur;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
  }
})();
