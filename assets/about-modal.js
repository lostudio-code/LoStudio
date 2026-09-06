/* About Michael modal — shared by index.html and resume.html.
   Include with <script src="assets/about-modal.js" defer></script> and add any
   link/button with [data-about-modal] (or id="about-more-link") to open it. */
(function () {
  const CSS = `
.am-overlay { position: fixed; inset: 0; z-index: 300; display: flex; align-items: center; justify-content: center; padding: 4vh 20px; background: rgba(10,10,10,.7); backdrop-filter: blur(8px); opacity: 0; transition: opacity .25s ease; }
.am-overlay[hidden] { display: none; }
.am-overlay.open { opacity: 1; }
.am-modal { width: min(760px, 100%); max-height: 74vh; display: flex; flex-direction: column; background: #161616; border: 1px solid rgba(255,255,255,.12); border-radius: 6px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,.6); transform: translateY(18px) scale(.98); transition: transform .3s cubic-bezier(.2,.7,.3,1); }
.am-overlay.open .am-modal { transform: none; }
.am-bar { display: flex; align-items: center; gap: 14px; height: 46px; padding: 0 16px; border-bottom: 1px solid rgba(255,255,255,.08); flex: none; }
.am-dots { display: flex; gap: 7px; }
.am-dots i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,.14); }
.am-file { font-family: var(--mono); font-size: 12.5px; letter-spacing: .04em; color: rgba(255,255,255,.45); }
.am-close { margin-left: auto; display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 5px; border: 1px solid rgba(255,255,255,.14); background: none; color: #fff; cursor: pointer; transition: border-color .15s, color .15s; }
.am-close:hover { border-color: var(--link); color: var(--link); }
.am-scroll { position: relative; overflow-y: auto; overscroll-behavior: contain; }
.am-gutter { position: absolute; top: 0; left: 0; width: 54px; border-right: 1px solid rgba(255,255,255,.07); font-family: var(--mono); font-size: 12.5px; line-height: 34px; color: rgba(255,255,255,.22); padding-left: 16px; user-select: none; pointer-events: none; }
.am-body { padding: 30px 34px 44px 88px; font-family: var(--mono); }
.am-body p { font-size: 15px; line-height: 1.85; color: rgba(255,255,255,.78); max-width: 60ch; text-wrap: pretty; }
.am-body p + p { margin-top: 18px; }
.am-cmt { font-size: 13.5px !important; color: rgba(255,255,255,.34) !important; letter-spacing: .02em; }
.am-cmt b { font-weight: 400; color: rgba(255,255,255,.55); }
p.am-cmt { margin-top: 40px; } .am-body p.am-cmt:first-child { margin-top: 0; }
.am-h { margin: 10px 0 18px; font-family: var(--mono); font-size: clamp(21px, 2.4vw, 28px); font-weight: 700; letter-spacing: -.02em; line-height: 1.2; color: #fff; }
.am-h .ch, .am-body p .ch { opacity: 0; }
.am-hl { background: rgba(255,255,255,.1); color: #fff; padding: 1px 5px; border-radius: 3px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
.am-caret { display: inline-block; width: 8px; height: 1.05em; background: var(--link); vertical-align: text-bottom; margin-left: 5px; animation: amBlink 1.1s steps(1) infinite; }
@keyframes amBlink { 50% { opacity: 0; } }
body.am-lock { overflow: hidden; }
@media (max-width: 640px){ .am-gutter { display: none; } .am-body { padding-left: 26px; padding-right: 26px; } }`;

  const HTML = `<div class="am-modal">
    <div class="am-bar">
      <span class="am-dots"><i></i><i></i><i></i></span>
      <span class="am-file">about-michael.html</span>
      <button class="am-close" id="am-close" aria-label="Close"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    </div>
    <div class="am-scroll" id="am-scroll">
      <div class="am-gutter" id="am-gutter" aria-hidden="true"></div>
      <div class="am-body">
        <p class="am-cmt">&lt;!--  <b>About me</b>  --&gt;</p>
        <h2 class="am-h" id="am-title">Still learning, still building</h2>
        <p>I'm a <span class="am-hl">first generation Italian from New York</span>, and a designer who's spent 20+ years helping brands grow up. A little of the story behind the portfolio.</p>
        <p>My life ran on two engines growing up: <span class="am-hl">sports and art</span>. Anything with a scoreboard, then the cleats came off and a pencil came out. I never thought of those as opposites. Both come down to reps, instinct, and knowing when to make your move.</p>
        <p>Art class turned into graffiti as a teenager, and at 16 I found digital design and never looked back. I taught myself from software books long before I sat in a design classroom. The degrees came later, but that same <span class="am-hl">"teach yourself first"</span> instinct is still how I start every project.</p>
        <p class="am-cmt">&lt;!--  <b>How I work</b>  --&gt;</p>
        <h2 class="am-h">Build the Brand, Then Earn the Click</h2>
        <p>I build brands, and I build the things brands live inside: identity, web, motion, video, events. The seams between those pieces are usually where growth leaks, so I'd rather own the whole stack than one slice of it.</p>
        <p>Before I design anything, I try to <span class="am-hl">sit in the user's seat</span>. What did they come here to do, what's in the way, and what would make the next step obvious? That's the question behind every layout choice I make. Then I stay with it after launch: reading the funnel, cutting the friction, testing the headline, <span class="am-hl">turning visits into signups</span>. Good design should be measurable, and I like being on the hook for the number.</p>
        <p>The other half of the job is just <span class="am-hl">showing up</span>. I'm the person who ships on the deadline, picks up the unglamorous work, and says when something isn't good enough yet, including when it's mine.</p>
        <p class="am-cmt">&lt;!--  <b>Outside the studio</b>  --&gt;</p>
        <h2 class="am-h">If I'm Not Designing, I'm Outside</h2>
        <p>Hiking, snowboarding, kayaking, and travel whenever I can get it. <span class="am-hl">If it gets me outside, I'm probably already there.</span> Most of my favorite ideas didn't show up at a desk. They showed up on a trail. I like home improvement projects for the same reason: building things, then getting to stand back and look at a finished one.</p>
        <p>Time outside isn't a break from the work, it's what keeps the work good. Burnout is a design problem too, so I protect the balance: <span class="am-hl">move every day, eat clean, sleep well</span> so I can live a healthy, happy life.</p>
        <p><span class="am-hl">Music runs underneath all of it.</span> No single genre, whatever fits the moment, and rarely a design session without something on.</p>
        <p>I've been lucky to work alongside some of the smartest people in Silicon Valley, and none of what I know happened solo. <span class="am-hl">Thanks for stopping by!</span><span class="am-caret"></span></p>
      </div>
    </div>
  </div>`;

  function init() {
    const links = [...document.querySelectorAll('[data-about-modal], #about-more-link')];
    if (!links.length) return;

    const style = document.createElement('style'); style.textContent = CSS;
    document.head.appendChild(style);
    const overlay = document.createElement('div');
    overlay.className = 'am-overlay'; overlay.id = 'am-overlay';
    overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'am-title'); overlay.hidden = true;
    overlay.innerHTML = HTML;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('#am-close'), scroll = overlay.querySelector('#am-scroll'),
          gutter = overlay.querySelector('#am-gutter');
    let lastFocus = null;

    function fillGutter() {
      const h = scroll.scrollHeight, lh = 34, n = Math.ceil(h / lh);
      gutter.style.height = h + 'px';
      let out = ''; for (let i = 0; i < n; i++) out += i + '<br>';
      gutter.innerHTML = out;
    }

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const blocks = [...overlay.querySelectorAll('.am-body > *')];
    if (!reduce) blocks.forEach(el => {
      (function wrap(node) {
        [...node.childNodes].forEach(n => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            for (const ch of n.textContent) {
              if (ch.trim() === '') { frag.appendChild(document.createTextNode(ch)); continue; }
              const s = document.createElement('span'); s.className = 'ch'; s.textContent = ch; frag.appendChild(s);
            }
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && !n.classList.contains('am-caret')) wrap(n);
        });
      })(el);
    });

    let played = false, timer = null;
    function finishAll() {
      overlay.querySelectorAll('.ch').forEach(c => c.style.opacity = '1');
      overlay.querySelectorAll('.tw-cur').forEach(c => c.remove());
    }
    function armTypewriter() {
      if (reduce || played) return;
      played = true;
      const cur = document.createElement('span'); cur.className = 'am-caret tw-cur';
      let b = 0;
      (function next() {
        if (b >= blocks.length) { cur.remove(); return; }
        const el = blocks[b++], chars = el.querySelectorAll('.ch');
        const isHead = el.classList.contains('am-h');
        const speed = isHead ? 24 : 4, batch = isHead ? 1 : 4;
        let i = 0;
        (function step() {
          if (overlay.hidden) { finishAll(); return; }
          for (let k = 0; k < batch && i < chars.length; k++) { chars[i].style.opacity = '1'; cur.remove(); chars[i].after(cur); i++; }
          if (i < chars.length) timer = setTimeout(step, speed);
          else timer = setTimeout(next, 140);
        })();
      })();
    }
    function open(e) {
      e.preventDefault(); lastFocus = document.activeElement;
      overlay.hidden = false; document.body.classList.add('am-lock');
      requestAnimationFrame(() => { overlay.classList.add('open'); fillGutter(); armTypewriter(); });
      closeBtn.focus();
    }
    function close() {
      overlay.classList.remove('open'); document.body.classList.remove('am-lock');
      if (timer) { clearTimeout(timer); timer = null; } finishAll();
      setTimeout(() => { overlay.hidden = true; scroll.scrollTop = 0; }, 250);
      if (lastFocus) lastFocus.focus();
    }
    links.forEach(l => l.addEventListener('click', open));
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && !overlay.hidden) close(); });
    addEventListener('resize', () => { if (!overlay.hidden) fillGutter(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
