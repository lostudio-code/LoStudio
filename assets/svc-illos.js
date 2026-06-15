/* ============================================================
   LO STUDIO — Service card illustrations
   Line-art spot illustrations · white + volt on dark
   ============================================================ */
(function () {
  const V = '#D9F400';

  /* 01 — Brand Identity: letterform construction sheet */
  const brand = `
  <svg viewBox="0 0 320 240" fill="none" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Brand identity — letterform construction">
    <circle cx="138" cy="120" r="76" stroke="#fff" stroke-opacity=".16" stroke-width="1.5" stroke-dasharray="3 7"></circle>
    <circle cx="138" cy="120" r="47" stroke="#fff" stroke-opacity=".12" stroke-width="1.5" stroke-dasharray="3 7"></circle>
    <line x1="138" y1="28" x2="138" y2="212" stroke="#fff" stroke-opacity=".1" stroke-width="1.5" stroke-dasharray="3 7"></line>
    <line x1="34" y1="120" x2="242" y2="120" stroke="#fff" stroke-opacity=".1" stroke-width="1.5" stroke-dasharray="3 7"></line>
    <text x="138" y="146" text-anchor="middle" font-size="76" font-weight="800" letter-spacing="-4" fill="#fff">Lo</text>
    <line x1="84" y1="146" x2="192" y2="146" stroke="${V}" stroke-width="2.5"></line>
    <circle cx="84" cy="146" r="3.5" fill="${V}"></circle>
    <circle cx="192" cy="146" r="3.5" fill="${V}"></circle>
    <rect x="256" y="78" width="28" height="28" rx="8" fill="${V}"></rect>
    <rect x="256" y="114" width="28" height="28" rx="8" stroke="#fff" stroke-opacity=".55" stroke-width="2"></rect>
    <rect x="256" y="150" width="28" height="28" rx="8" stroke="#fff" stroke-opacity=".22" stroke-width="2"></rect>
    <path d="M30 44V30h14" stroke="#fff" stroke-opacity=".3" stroke-width="2"></path>
    <path d="M276 30h14v14" stroke="#fff" stroke-opacity=".3" stroke-width="2"></path>
    <path d="M30 196v14h14" stroke="#fff" stroke-opacity=".3" stroke-width="2"></path>
    <path d="M290 196v14h-14" stroke="#fff" stroke-opacity=".3" stroke-width="2"></path>
  </svg>`;

  /* 02 — Web Design: browser window wireframe with cursor */
  const web = `
  <svg viewBox="0 0 320 240" fill="none" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Web design — browser wireframe">
    <rect x="34" y="32" width="252" height="176" rx="14" stroke="#fff" stroke-opacity=".55" stroke-width="2.5"></rect>
    <line x1="34" y1="64" x2="286" y2="64" stroke="#fff" stroke-opacity=".25" stroke-width="2"></line>
    <circle cx="54" cy="48" r="3.5" fill="${V}"></circle>
    <circle cx="67" cy="48" r="3.5" fill="#fff" fill-opacity=".35"></circle>
    <circle cx="80" cy="48" r="3.5" fill="#fff" fill-opacity=".35"></circle>
    <rect x="206" y="44" width="22" height="7" rx="3.5" fill="#fff" fill-opacity=".3"></rect>
    <rect x="236" y="44" width="22" height="7" rx="3.5" fill="#fff" fill-opacity=".3"></rect>
    <rect x="56" y="90" width="118" height="11" rx="5.5" fill="#fff" fill-opacity=".85"></rect>
    <rect x="56" y="109" width="86" height="11" rx="5.5" fill="#fff" fill-opacity=".3"></rect>
    <rect x="56" y="136" width="64" height="24" rx="12" fill="${V}"></rect>
    <rect x="196" y="86" width="66" height="74" rx="10" stroke="#fff" stroke-opacity=".4" stroke-width="2"></rect>
    <circle cx="214" cy="104" r="6" stroke="#fff" stroke-opacity=".5" stroke-width="2"></circle>
    <path d="M199 152l19-21 14 13 11-14 16 22" stroke="#fff" stroke-opacity=".5" stroke-width="2"></path>
    <rect x="56" y="178" width="62" height="14" rx="5" stroke="#fff" stroke-opacity=".22" stroke-width="2"></rect>
    <rect x="129" y="178" width="62" height="14" rx="5" stroke="#fff" stroke-opacity=".22" stroke-width="2"></rect>
    <rect x="202" y="178" width="60" height="14" rx="5" stroke="#fff" stroke-opacity=".22" stroke-width="2"></rect>
    <g transform="translate(112 150)"><path d="M0 0l0 13 3.4-3 2.2 4.8 2.4-1.1-2.2-4.7 4.6-.3z" fill="#fff" stroke="#141414" stroke-width="1" stroke-linejoin="round"></path></g>
  </svg>`;

  /* 03 — Product UI/UX: dashboard with chart */
  const product = `
  <svg viewBox="0 0 320 240" fill="none" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Product UI — dashboard wireframe">
    <rect x="34" y="30" width="252" height="180" rx="14" stroke="#fff" stroke-opacity=".55" stroke-width="2.5"></rect>
    <line x1="92" y1="30" x2="92" y2="210" stroke="#fff" stroke-opacity=".25" stroke-width="2"></line>
    <rect x="48" y="48" width="30" height="9" rx="4.5" fill="${V}"></rect>
    <rect x="48" y="66" width="30" height="9" rx="4.5" fill="#fff" fill-opacity=".25"></rect>
    <rect x="48" y="84" width="30" height="9" rx="4.5" fill="#fff" fill-opacity=".25"></rect>
    <rect x="48" y="102" width="30" height="9" rx="4.5" fill="#fff" fill-opacity=".25"></rect>
    <rect x="48" y="184" width="32" height="16" rx="8" fill="${V}"></rect>
    <circle cx="72" cy="192" r="5.5" fill="#141414"></circle>
    <rect x="106" y="46" width="76" height="40" rx="8" stroke="#fff" stroke-opacity=".35" stroke-width="2"></rect>
    <rect x="192" y="46" width="76" height="40" rx="8" stroke="#fff" stroke-opacity=".35" stroke-width="2"></rect>
    <rect x="116" y="56" width="26" height="7" rx="3.5" fill="#fff" fill-opacity=".3"></rect>
    <rect x="116" y="69" width="40" height="9" rx="4.5" fill="#fff" fill-opacity=".75"></rect>
    <rect x="202" y="56" width="26" height="7" rx="3.5" fill="#fff" fill-opacity=".3"></rect>
    <rect x="202" y="69" width="40" height="9" rx="4.5" fill="${V}"></rect>
    <rect x="106" y="98" width="162" height="96" rx="8" stroke="#fff" stroke-opacity=".35" stroke-width="2"></rect>
    <rect x="122" y="156" width="14" height="24" rx="3" fill="#fff" fill-opacity=".25"></rect>
    <rect x="146" y="142" width="14" height="38" rx="3" fill="#fff" fill-opacity=".25"></rect>
    <rect x="170" y="150" width="14" height="30" rx="3" fill="#fff" fill-opacity=".25"></rect>
    <rect x="194" y="128" width="14" height="52" rx="3" fill="${V}"></rect>
    <rect x="218" y="138" width="14" height="42" rx="3" fill="#fff" fill-opacity=".25"></rect>
    <rect x="242" y="118" width="14" height="62" rx="3" fill="#fff" fill-opacity=".25"></rect>
    <path d="M122 148l28-18 28 8 28-24 44-10" stroke="${V}" stroke-width="2.5" stroke-opacity=".9"></path>
    <circle cx="250" cy="104" r="4" fill="${V}"></circle>
  </svg>`;

  /* 04 — Motion & Video: player + edit timeline */
  const video = `
  <svg viewBox="0 0 320 240" fill="none" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Motion and video — player with edit timeline">
    <rect x="34" y="26" width="252" height="132" rx="14" stroke="#fff" stroke-opacity=".55" stroke-width="2.5"></rect>
    <rect x="48" y="40" width="36" height="11" rx="5.5" fill="#fff" fill-opacity=".18"></rect>
    <circle cx="160" cy="92" r="26" fill="${V}"></circle>
    <path d="M153 80l22 12-22 12z" fill="#161616"></path>
    <rect x="34" y="176" width="252" height="38" rx="9" stroke="#fff" stroke-opacity=".35" stroke-width="2"></rect>
    <rect x="44" y="184" width="56" height="22" rx="5" fill="#fff" fill-opacity=".18"></rect>
    <rect x="108" y="184" width="84" height="22" rx="5" fill="${V}" fill-opacity=".9"></rect>
    <rect x="200" y="184" width="42" height="22" rx="5" fill="#fff" fill-opacity=".18"></rect>
    <rect x="250" y="184" width="26" height="22" rx="5" fill="#fff" fill-opacity=".1"></rect>
    <line x1="150" y1="170" x2="150" y2="220" stroke="#fff" stroke-width="2"></line>
    <path d="M144 164h12l-6 8z" fill="#fff"></path>
  </svg>`;

  /* 05 — Go-to-Market: launching rocket */
  const social = `
  <svg viewBox="0 0 320 240" fill="none" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Go-to-market — launching rocket">
    <path d="M50 198c44-2 76-22 98-50" stroke="#fff" stroke-opacity=".25" stroke-width="2" stroke-dasharray="2 9"></path>
    <g transform="rotate(38 178 108)">
      <path d="M178 48c18 22 24 52 24 84h-48c0-32 6-62 24-84z" stroke="#fff" stroke-width="2.5"></path>
      <circle cx="178" cy="96" r="11" stroke="${V}" stroke-width="2.5"></circle>
      <path d="M154 116l-22 32 22-6" stroke="#fff" stroke-width="2.5"></path>
      <path d="M202 116l22 32-22-6" stroke="#fff" stroke-width="2.5"></path>
      <path d="M168 138c2 14 10 24 10 24s8-10 10-24" stroke="${V}" stroke-width="2.5"></path>
    </g>
    <path d="M262 52v16M254 60h16" stroke="${V}" stroke-width="2.5"></path>
    <path d="M66 78v12M60 84h12" stroke="#fff" stroke-opacity=".35" stroke-width="2"></path>
    <circle cx="244" cy="170" r="3" fill="#fff" fill-opacity=".3"></circle>
    <circle cx="96" cy="136" r="2.5" fill="${V}" fill-opacity=".7"></circle>
  </svg>`;

  window.LO_SVC_ILLOS = { brand: brand, web: web, product: product, video: video, social: social };
})();
