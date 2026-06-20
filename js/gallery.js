// js/gallery.js — lightbox for #lavori gallery
(() => {
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  if (!gallery || !lightbox) return;

  const img = lightbox.querySelector(".lightbox__img");
  const btnClose = lightbox.querySelector(".lightbox__close");
  const btnPrev = lightbox.querySelector(".lightbox__prev");
  const btnNext = lightbox.querySelector(".lightbox__next");

  const triggers = Array.from(gallery.querySelectorAll("button[data-full]"));
  const fulls = triggers.map(b => ({
    src: b.dataset.full,
    alt: b.querySelector("img")?.alt || ""
  }));
  let index = 0;

  function open(i) {
    index = (i + fulls.length) % fulls.length;
    img.src = fulls[index].src;
    img.alt = fulls[index].alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    img.src = "";
    document.body.style.overflow = "";
  }
  const prev = () => open(index - 1);
  const next = () => open(index + 1);

  triggers.forEach((btn, i) => btn.addEventListener("click", () => open(i)));
  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();
