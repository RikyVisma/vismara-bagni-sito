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
      // Use FormSubmit's AJAX endpoint (JSON response, CORS enabled)
      const endpoint = form.action.replace("formsubmit.co/", "formsubmit.co/ajax/");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });
      const data = await res.json().catch(() => ({}));
      const ok = data.success === "true" || data.success === true;
      const needsActivation = /confirm|activat|attiv/i.test(data.message || "");

      if (res.ok && ok) {
        feedback.textContent = "✓ Richiesta inviata! Ti risponderemo entro 24 ore lavorative.";
        feedback.className = "form-feedback is-success";
        form.reset();
      } else if (needsActivation) {
        // First-time only: FormSubmit sent an activation email to the owner
        feedback.textContent = "Modulo in attivazione: controlla la tua email per confermare (succede solo la prima volta).";
        feedback.className = "form-feedback is-success";
      } else {
        throw new Error(data.message || `HTTP ${res.status}`);
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
