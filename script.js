/* script.js — minimal JS, only what adds real value */

(function () {
  'use strict';

  /* ── Header: solid background on scroll ── */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load in case page is already scrolled
  }

})();
