// js/nav.js — sticky nav helpers: hamburger, smooth scroll, scroll spy
(() => {
  const nav = document.querySelector(".site-nav");
  const toggle = nav?.querySelector(".site-nav__toggle");
  const list = nav?.querySelector(".site-nav__list");
  const links = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];

  if (!nav || !toggle || !list) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Chiudi menu" : "Apri menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) setOpen(false);
  });

  links.forEach(a => a.addEventListener("click", () => {
    if (nav.classList.contains("is-open")) setOpen(false);
  }));

  // --- Scroll spy ---
  const sectionIds = links
    .map(a => a.getAttribute("href"))
    .filter(h => h && h.startsWith("#") && h.length > 1)
    .map(h => h.slice(1));

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const linkById = Object.fromEntries(
    links.map(a => [a.getAttribute("href").slice(1), a])
  );

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const a = linkById[entry.target.id];
        if (!a) return;
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove("is-active"));
          a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

    sections.forEach(s => observer.observe(s));
  }
})();
