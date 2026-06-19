/* CC Agent — shared chrome (nav/footer/modals) + interactions, injected once for every page.
   Each page sets <body data-page="home|platform|models|solutions|trust|pricing|docs|other">
   and includes <header id="nav"></header> ... <div id="site-footer"></div>. */
(function () {
  var DEMO_EMAIL = 'cai.yuesong@outlook.com';
  // Optional: paste a Web3Forms access key (free, web3forms.com, verify the address above)
  // to deliver the demo form server-side with no mail client. Empty = mailto fallback.
  var WEB3FORMS_KEY = '';

  var MARK = '<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor"><rect x="3.5" y="3.5" width="41" height="41" rx="13" stroke-width="2.4"/><path d="M15 24H25M25 24C30 24 30 14.5 34.5 14.5M25 24H34.5M25 24C30 24 30 33.5 34.5 33.5" stroke-width="2.2" stroke-linecap="round"/></g><g fill="currentColor"><circle cx="15" cy="24" r="2.7"/><circle cx="35.5" cy="14.5" r="2.4"/><circle cx="35.5" cy="24" r="2.4"/><circle cx="35.5" cy="33.5" r="2.4"/></g></svg>';

  // [label, key, href (direct link), menu (dropdown)]; menu item = [key, href, title, desc]
  var NAV = [
    ['Product', 'product', null, [
      ['platform', 'platform.html', 'Platform', 'One control plane for every model call'],
      ['models', 'models.html', 'Models', 'Every model behind one compliant API'],
      ['pricing', 'pricing.html', 'Pricing', 'Bring your own Bedrock, or fully managed'],
      ['docs', 'docs.html', 'Docs', 'Quickstart and the API reference'],
    ]],
    ['Solutions', 'solutions', 'solutions.html', null],
    ['Trust', 'trust', 'trust.html', null],
  ];

  var FOOTER_COLS = [
    ['Product', [['Platform', 'platform.html'], ['Models', 'models.html'], ['Pricing', 'pricing.html']]],
    ['Company', [['About', 'company.html'], ['Careers', 'careers.html']]],
    ['Trust', [['Trust center', 'trust.html'], ['Security', 'security.html']]],
    ['Legal', [['Privacy', 'privacy.html'], ['Terms', 'terms.html'], ['Disclaimer', 'disclaimer.html'], ['Contact', 'contact.html']]],
  ];

  var REGION_LINE = 'Claude on Amazon Bedrock (multi-region) with Anthropic Direct failover. Channel availability subject to AWS and Anthropic authorization. AWS global partition; no China-region deployment.';

  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

  // ---- NAV ----
  function buildNav() {
    var host = document.getElementById('nav');
    if (!host) return;
    var page = document.body.getAttribute('data-page') || '';
    var mobItems = [];
    var tabs = NAV.map(function (g) {
      var label = g[0], key = g[1], href = g[2], menu = g[3];
      if (menu) {
        var active = menu.some(function (m) { return m[0] === page; });
        var links = menu.map(function (m) {
          mobItems.push([m[2], m[1]]);
          return '<a class="navlink' + (m[0] === page ? ' on' : '') + '" href="' + m[1] + '" role="menuitem">' +
            '<span class="nl-t">' + m[2] + '</span><span class="nl-d">' + m[3] + '</span></a>';
        }).join('');
        return '<div class="navgroup' + (active ? ' on' : '') + '">' +
          '<button class="navtop navtrig" type="button" aria-haspopup="true" aria-expanded="false">' + label + ' <i class="ph ph-caret-down caret"></i></button>' +
          '<div class="navpanel" role="menu">' + links + '</div></div>';
      }
      mobItems.push([label, href]);
      return '<a class="navtop' + (key === page ? ' on' : '') + '" href="' + href + '">' + label + '</a>';
    }).join('');
    var mob = mobItems.map(function (i) { return '<a href="' + i[1] + '">' + i[0] + '</a>'; }).join('');
    host.className = 'nav';
    host.innerHTML =
      '<div class="wrap nav-inner">' +
        '<a class="brand" href="index.html"><span class="mk">' + MARK + '</span><span class="nm">CC Agent</span></a>' +
        '<nav class="tabs" aria-label="Primary">' + tabs + '</nav>' +
        '<div class="nav-cta">' +
          '<button class="btn btn-primary btn-sm js-demo" type="button">Book a demo</button>' +
          '<button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false"><i class="ph ph-list"></i></button>' +
        '</div>' +
      '</div>' +
      '<div class="nav-mobile" id="navMobile">' + mob + '<button class="btn btn-primary js-demo" type="button">Book a demo</button></div>';

    // mobile toggle
    var t = host.querySelector('#navToggle'), m = host.querySelector('#navMobile');
    t.addEventListener('click', function () { var o = m.classList.toggle('open'); t.setAttribute('aria-expanded', String(o)); });
    m.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { m.classList.remove('open'); }); });

    // desktop dropdowns: hover via CSS; click/touch + keyboard via JS
    var groups = host.querySelectorAll('.navgroup');
    function closeGroups(except) {
      groups.forEach(function (o) { if (o !== except) { o.classList.remove('open'); o.querySelector('.navtrig').setAttribute('aria-expanded', 'false'); } });
    }
    groups.forEach(function (g) {
      var trig = g.querySelector('.navtrig');
      trig.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = g.classList.toggle('open');
        trig.setAttribute('aria-expanded', String(open));
        closeGroups(g);
      });
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.navgroup')) closeGroups(null); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeGroups(null); });
  }

  // ---- FOOTER ----
  function buildFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;
    var cols = FOOTER_COLS.map(function (c) {
      var links = c[1].map(function (l) { return '<a href="' + l[1] + '">' + l[0] + '</a>'; }).join('');
      return '<nav class="fcol" aria-label="' + c[0] + '"><h4>' + c[0] + '</h4>' + links + '</nav>';
    }).join('');
    host.className = 'footer dark';
    host.innerHTML =
      '<div class="wrap">' +
        '<div class="fgrid">' +
          '<div class="fbrand"><a class="brand" href="index.html" style="color:var(--paper)"><span class="mk" style="color:#B07FA6">' + MARK + '</span><span class="nm">CC Agent</span></a>' +
            '<p class="ftag">One API to route, govern, and audit every call your AI agents make.</p></div>' +
          cols +
        '</div>' +
        '<div class="fbase"><span class="mono">© ' + new Date().getFullYear() + ' CC Agent</span><span class="flegal">' + REGION_LINE + '</span></div>' +
      '</div>';
  }

  // ---- MODALS (card detail + demo form) ----
  function buildModals() {
    document.body.appendChild(el(
      '<dialog id="modal" class="modal" aria-labelledby="modalTitle"><div class="modal-card">' +
      '<button class="modal-x" data-close aria-label="Close"><i class="ph ph-x"></i></button>' +
      '<p class="modal-eyebrow"></p><h3 class="modal-title" id="modalTitle"></h3><div class="modal-body"></div>' +
      '</div></dialog>'));

    document.body.appendChild(el(
      '<dialog id="demoModal" class="modal" aria-labelledby="demoTitle"><div class="modal-card">' +
      '<button class="modal-x" data-close aria-label="Close"><i class="ph ph-x"></i></button>' +
      '<p class="modal-eyebrow">Book a demo</p><h3 class="modal-title" id="demoTitle">Tell us about your stack.</h3>' +
      '<form id="demoForm" class="demo-form" novalidate>' +
        '<label>Name<input name="name" required autocomplete="name" /></label>' +
        '<label>Work email<input name="email" type="email" required autocomplete="email" /></label>' +
        '<label>Company<input name="company" autocomplete="organization" /></label>' +
        '<label>What do you want to route, govern, or audit?<textarea name="message" rows="3"></textarea></label>' +
        '<button class="btn btn-primary" type="submit">Send <i class="ph ph-arrow-right"></i></button>' +
        '<p class="demo-note">Goes straight to our team. We reply within one business day.</p>' +
      '</form>' +
      '<div class="demo-ok" hidden><i class="ph ph-check-circle"></i><p>Thanks. We will be in touch within one business day.</p></div>' +
      '</div></dialog>'));
  }

  function openDialog(d) { if (!d) return; if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', ''); }
  function wireDialogDismiss(d) {
    d.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) { d.close(); return; }
      var r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
    });
  }

  function wireModals() {
    var modal = document.getElementById('modal');
    if (modal) {
      var mEye = modal.querySelector('.modal-eyebrow'), mTitle = modal.querySelector('.modal-title'), mBody = modal.querySelector('.modal-body');
      function openCard(c) {
        var eb = c.getAttribute('data-eyebrow') || '';
        mEye.textContent = eb; mEye.style.display = eb ? 'block' : 'none';
        mTitle.textContent = c.getAttribute('data-title') || '';
        var d = c.querySelector('.cardetail'); mBody.innerHTML = d ? d.innerHTML : '';
        openDialog(modal);
      }
      document.querySelectorAll('.card-click').forEach(function (c) {
        c.setAttribute('tabindex', '0'); c.setAttribute('role', 'button');
        c.addEventListener('click', function () { openCard(c); });
        c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCard(c); } });
      });
      wireDialogDismiss(modal);
    }

    var demo = document.getElementById('demoModal');
    if (demo) {
      wireDialogDismiss(demo);
      document.querySelectorAll('.js-demo').forEach(function (b) { b.addEventListener('click', function () { openDialog(demo); }); });
      var form = demo.querySelector('#demoForm'), ok = demo.querySelector('.demo-ok');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.reportValidity()) return;
        var data = { name: form.name.value, email: form.email.value, company: form.company.value, message: form.message.value };
        function done() { form.setAttribute('hidden', ''); ok.removeAttribute('hidden'); }
        if (WEB3FORMS_KEY) {
          fetch('https://api.web3forms.com/submit', {
            method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: 'CC Agent demo request — ' + (data.company || data.name), from_name: data.name, email: data.email, company: data.company, message: data.message })
          }).then(done).catch(done);
        } else {
          var body = 'Name: ' + data.name + '%0D%0AEmail: ' + data.email + '%0D%0ACompany: ' + data.company + '%0D%0A%0D%0A' + encodeURIComponent(data.message);
          window.location.href = 'mailto:' + DEMO_EMAIL + '?subject=' + encodeURIComponent('CC Agent demo request — ' + (data.company || data.name)) + '&body=' + body;
          done();
        }
      });
    }
  }

  // ---- PRODUCT PREVIEW TABS ----
  function wireTabs() {
    document.querySelectorAll('.preview').forEach(function (pv) {
      var tabs = pv.querySelectorAll('.ptabs button');
      tabs.forEach(function (b) {
        b.addEventListener('click', function () {
          tabs.forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-selected', 'false'); });
          pv.querySelectorAll('.ppanel').forEach(function (p) { p.classList.remove('on'); });
          b.classList.add('on'); b.setAttribute('aria-selected', 'true');
          var panel = pv.querySelector('.ppanel[data-panel="' + b.getAttribute('data-tab') + '"]'); if (panel) panel.classList.add('on');
          var desc = pv.querySelector('.ptabs-desc'); if (desc && b.getAttribute('data-desc')) desc.textContent = b.getAttribute('data-desc');
        });
      });
    });
  }

  // ---- FAQ: single-open accordion with smooth grid-rows motion ----
  function wireFaq() {
    document.querySelectorAll('.faq').forEach(function (faq) {
      var items = faq.querySelectorAll('.faq-item');
      items.forEach(function (it) {
        var q = it.querySelector('.faq-q');
        q.addEventListener('click', function () {
          var willOpen = !it.classList.contains('open');
          items.forEach(function (o) { o.classList.remove('open'); var b = o.querySelector('.faq-q'); if (b) b.setAttribute('aria-expanded', 'false'); });
          if (willOpen) { it.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
        });
      });
    });
  }

  // ---- SCROLL REVEAL ----
  function wireReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { reveals.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          var sib = [].slice.call(e.target.parentElement.children).filter(function (c) { return c.classList.contains('reveal'); });
          setTimeout(function () { e.target.classList.add('in'); }, Math.min(sib.indexOf(e.target), 6) * 70);
          io.unobserve(e.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (e) { io.observe(e); });
    requestAnimationFrame(function () { reveals.forEach(function (e) { if (e.getBoundingClientRect().top < innerHeight * 0.95) { e.classList.add('in'); io.unobserve(e); } }); });
  }

  // ---- LOGO MARQUEE: clone track once for a seamless -50% loop ----
  function wireMarquee() {
    var track = document.querySelector('.marquee-track');
    if (!track) return;
    [].slice.call(track.children).forEach(function (node) {
      var c = node.cloneNode(true); c.setAttribute('aria-hidden', 'true'); track.appendChild(c);
    });
  }

  function init() {
    buildNav(); buildFooter(); buildModals();
    wireModals(); wireTabs(); wireFaq(); wireMarquee(); wireReveal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
