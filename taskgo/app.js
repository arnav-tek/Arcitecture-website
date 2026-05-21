/* =========================================================
   TaskGo-inspired landing page — interactions
   ========================================================= */
(function () {
  'use strict';

  /* -------- Page loader -------------------------------- */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(function () { loader.classList.add('hide'); }, 450);
  });

  /* -------- Sticky-nav shadow on scroll ---------------- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------- Mobile nav toggle -------------------------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        toggle.classList.remove('open');
        links.classList.remove('open');
      }
    });
  }

  /* -------- Apply reveal delays from data-delay -------- */
  var revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach(function (el) {
    var d = el.getAttribute('data-delay');
    if (d) el.style.setProperty('--delay', d + 'ms');
  });

  /* -------- IntersectionObserver scroll reveal --------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: just show
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* -------- Pricing toggle (monthly / yearly) ---------- */
  var tOpts = document.querySelectorAll('.t-opt');
  var nums = document.querySelectorAll('.plan .num');
  var perEls = document.querySelectorAll('.plan .per');

  function setBilling(mode) {
    tOpts.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-billing') === mode);
    });
    nums.forEach(function (n) {
      var monthly = n.getAttribute('data-monthly');
      var yearly = n.getAttribute('data-yearly');
      var newVal = mode === 'yearly' ? yearly : monthly;
      n.style.opacity = '0';
      setTimeout(function () {
        n.textContent = newVal;
        n.style.opacity = '1';
      }, 150);
    });
    perEls.forEach(function (p) {
      p.textContent = mode === 'yearly' ? '/user / mo, billed yearly' : '/user / mo';
    });
  }

  tOpts.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setBilling(btn.getAttribute('data-billing'));
    });
  });

  /* -------- FAQ accordion (single-open behaviour) ------ */
  var faqs = document.querySelectorAll('.faq-item');
  faqs.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqs.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* -------- Subtle parallax on hero mock --------------- */
  var mock = document.querySelector('.mock-shell');
  var floats = document.querySelectorAll('.float');
  var hero = document.querySelector('.hero');
  if (hero && mock) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 to 0.5
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      mock.style.transform =
        'rotateX(' + (8 - y * 4) + 'deg) rotateY(' + (x * 4) + 'deg) translateY(0)';
      floats.forEach(function (f, i) {
        var depth = (i + 1) * 8;
        f.style.transform = 'translate(' + (x * depth) + 'px, ' + (y * depth) + 'px)';
      });
    });
    hero.addEventListener('mouseleave', function () {
      mock.style.transform = '';
      floats.forEach(function (f) { f.style.transform = ''; });
    });
  }

  /* -------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

})();
