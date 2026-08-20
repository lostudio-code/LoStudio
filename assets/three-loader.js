/* three.js on demand — keeps ~600 KB out of the initial page load.
   Callers: butterfly.js (desktop hover only), wordmark-projection.js (footer, on approach). */
window.LO_loadThree = (function () {
  var pending = null;
  return function () {
    if (window.THREE) return Promise.resolve(window.THREE);
    if (pending) return pending;
    pending = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'https://unpkg.com/three@0.160.0/build/three.min.js';
      s.async = true;
      s.onload = function () { window.THREE ? resolve(window.THREE) : reject(new Error('three missing')); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return pending;
  };
})();
