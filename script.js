// Header scroll effect
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });
}

// Scroll-triggered fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.04}s`;
  observer.observe(el);
});

// ── Language toggle ──────────────────────────────────────────
let currentLang = (function () {
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param === 'en' || param === 'es') return param;
  return localStorage.getItem('lang') || 'es';
})();

function applyLang(lang) {
  currentLang = lang;

  document.querySelectorAll('[data-es]').forEach(el => {
    const text = lang === 'en' ? el.dataset.en : el.dataset.es;
    if (text !== undefined) el.textContent = text;
  });

  document.documentElement.lang = lang;

  const btn = document.getElementById('lang-toggle-btn');
  if (btn) btn.textContent = lang === 'en' ? 'ES' : 'EN';

  localStorage.setItem('lang', lang);

  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url.toString());
}

const langBtn = document.getElementById('lang-toggle-btn');
if (langBtn) {
  applyLang(currentLang);

  langBtn.addEventListener('click', () => {
    applyLang(currentLang === 'es' ? 'en' : 'es');
  });
}
