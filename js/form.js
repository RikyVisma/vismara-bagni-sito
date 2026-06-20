// js/form.js — preventivo form submit handler with inline feedback
(() => {
  const form = document.querySelector(".preventivo-form");
  const feedback = document.getElementById("form-feedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.className = "form-feedback";
    feedback.textContent = "Invio in corso…";

    try {
      const data = new FormData(form);
      const body = new URLSearchParams();
      for (const [k, v] of data.entries()) body.append(k, v);

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });

      if (res.ok) {
        feedback.textContent = "✓ Richiesta inviata! Ti risponderemo entro 24 ore lavorative.";
        feedback.className = "form-feedback is-success";
        form.reset();
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.error("Form error:", err);
      feedback.innerHTML =
        "✗ Si è verificato un problema. Riprova o " +
        '<a href="mailto:vismarasnc@tiscalinet.it">scrivici via email</a>.';
      feedback.className = "form-feedback is-error";
    }
  });
})();
