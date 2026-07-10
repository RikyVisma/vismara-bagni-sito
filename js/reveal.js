// js/reveal.js — lightweight scroll-reveal (opacity + transform only, GPU-friendly)
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  const selector = [
    ".section-eyebrow",
    "section h2",
    ".section-lede",
    ".chi-siamo__lede",
    ".team-card",
    ".servizio-card",
    ".comparison",
    ".servizi__cta",
    ".gallery__item",
    ".lavori__cta",
    ".rating-badge",
    ".review",
    ".reviews__cta",
    ".preventivo-form",
    ".contatti-info"
  ].join(",");

  const els = Array.from(document.querySelectorAll(selector));
  if (!els.length) return;

  // Stagger siblings that share a parent (e.g. cards in a grid)
  const groups = new Map();
  els.forEach(el => {
    el.classList.add("reveal");
    const arr = groups.get(el.parentElement) || [];
    arr.push(el);
    groups.set(el.parentElement, arr);
  });
  groups.forEach(arr => arr.forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 60, 240) + "ms";
  }));

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });

  els.forEach(el => io.observe(el));

  // Safety net: never leave content hidden if the observer somehow doesn't fire.
  setTimeout(() => {
    els.forEach(el => el.classList.add("is-visible"));
  }, 4000);
})();
