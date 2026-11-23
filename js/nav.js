/* MonTirSportif – navigation : menu ☰ sur mobile, bouton « haut de page » */
(function () {
  var me = document.currentScript || document.querySelector('script[src$="js/nav.js"]');
  var base = me ? me.src.replace(/js\/nav\.js(\?.*)?$/, '') : '';
  var here = location.href.split('#')[0].split('?')[0];
  var key = base && here.indexOf(base) === 0 ? here.slice(base.length) : '';
  if (key === '' || /\/$/.test(key)) key += 'index.html';
  function rel(p) { return base + p; }

  var P = {
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9 16.2 7.8"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>'
  };
  function ico(k) { return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + P[k] + '</svg>'; }

  var css = '' +
    /* fil d'Ariane */
    '.crumbs{font-size:.82rem;color:var(--mut,#667);margin:0 0 .7rem;line-height:1.5}' +
    '.crumbs a{color:var(--mut,#667);text-decoration:none}.crumbs a:hover{color:var(--acc);text-decoration:underline}' +
    '.crumbs .sep{margin:0 .35rem;opacity:.6}.crumbs [aria-current]{color:var(--txt,#1b2430);font-weight:600}' +
    /* menu ☰ */
    '.burger{display:none;border:1px solid var(--line,#d5dbe3);background:var(--card,#fff);color:var(--txt,#1b2430);border-radius:99px;height:38px;padding:0 .8rem;font:inherit;font-size:.9rem;font-weight:600;cursor:pointer;align-items:center;gap:0;margin-left:auto}' +
    '.mnav{position:fixed;left:0;right:0;bottom:0;z-index:60;background:var(--bg,#e9ecf0);overflow-y:auto;padding:.6rem 1rem 2rem;border-top:1px solid var(--line,#d5dbe3)}' +
    '.mnav[hidden]{display:none}' +
    '.mnav a{display:flex;align-items:center;gap:.6rem;padding:.7rem .8rem;margin:.15rem 0;border-radius:10px;background:var(--card,#fff);color:var(--txt,#1b2430);text-decoration:none;font-size:1rem}' +
    '.mnav a.cur{outline:2px solid var(--acc);font-weight:600}' +
    '.mnav a .ico{margin-right:0;width:1.2rem;height:1.2rem}.mnav a span{display:inline-grid;place-items:center;width:1.5rem;height:1.5rem;border-radius:6px;color:#fff;font-size:.8rem;font-weight:700}' +
    '.mnav a.sub{margin-left:1.2rem;font-size:.92rem}' +
    '.mnav h4{margin:1rem 0 .3rem;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--mut,#667)}' +
    '@media (max-width:1280px){header #nav{display:none!important}.burger{display:inline-flex}}' +
    'body.mnav-open{overflow:hidden}' +
    '@media print{.crumbs,.burger,.mnav,.totop{display:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- Menu ☰ (téléphone et tablette) ---------- */
  function burger() {
    var bar = document.querySelector('header .bar'), nav = document.getElementById('nav');
    if (!bar || !nav) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'burger'; b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', 'mnav');
    b.innerHTML = ico('menu') + 'Menu';
    bar.appendChild(b);

    var m = document.createElement('div'); m.className = 'mnav'; m.id = 'mnav'; m.hidden = true;
    function add(href, html, cls) {
      var a = document.createElement('a'); a.href = href; a.innerHTML = html; if (cls) a.className = cls;
      var k = a.href.split('#')[0]; if (k === here && !/#/.test(href)) a.classList.add('cur');
      m.appendChild(a); return a;
    }
    function h(t) { var e = document.createElement('h4'); e.textContent = t; m.appendChild(e); }
    add(rel('index.html'), ico('home') + 'Accueil');
    h('Les rubriques');
    Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
      if (a.textContent.trim() === 'Accueil' || /^https?:/.test(a.getAttribute('href'))) return;
      add(a.getAttribute('href'), a.innerHTML);
    });
    h('Se repérer');
    add(rel('c-est-nouveau.html'), ico('star') + "C'est nouveau");
    add(rel('plan-du-site.html'), ico('map') + 'Plan du site');
    h('Aussi chez MonTirSportif');
    var rp = add('https://pistol.montirsportif.com/', 'Le site Pistolet ↗'); rp.target = '_blank'; rp.rel = 'noopener';
    var rb = add('https://pistol.montirsportif.com/bensport.html', 'bensport ↗'); rb.target = '_blank'; rb.rel = 'noopener';
    document.body.appendChild(m);

    function place() { var r = document.querySelector('header').getBoundingClientRect(); m.style.top = Math.max(0, r.bottom) + 'px'; }
    function open(o) {
      m.hidden = !o; b.setAttribute('aria-expanded', String(o));
      b.innerHTML = o ? ico('close') + 'Fermer' : ico('menu') + 'Menu';
      document.body.classList.toggle('mnav-open', o); if (o) place();
    }
    b.addEventListener('click', function (e) { e.stopPropagation(); open(m.hidden); });
    m.addEventListener('click', function (e) { if (e.target.closest('a')) open(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') open(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1280) open(false); else if (!m.hidden) place(); });
  }

  /* ---------- Bouton « haut de page » ---------- */
  function totop() {
    var t = document.querySelector('.totop');
    if (!t) {
      t = document.createElement('button'); t.type = 'button'; t.className = 'totop';
      t.setAttribute('aria-label', 'Revenir en haut de la page'); t.title = 'Haut de page'; t.textContent = '↑';
      document.body.appendChild(t);
    }
    t.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    function upd() { t.classList.toggle('on', window.scrollY > 600); }
    window.addEventListener('scroll', upd, { passive: true }); upd();
  }

  function init() { burger(); totop(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
