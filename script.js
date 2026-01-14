function initYear() {
  const yearEl = document.getElementById("year");
  if (!yearEl) return;
  yearEl.textContent = String(new Date().getFullYear());
}

function initFaq() {
  const root = document.querySelector("[data-faq]");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".faq-q"));

  function closeAll(exceptBtn) {
    for (const btn of buttons) {
      if (exceptBtn && btn === exceptBtn) continue;
      btn.setAttribute("aria-expanded", "false");
      const panel = btn.parentElement?.querySelector(".faq-a");
      if (panel) panel.hidden = true;
    }
  }

  for (const btn of buttons) {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      closeAll(btn);
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      const panel = btn.parentElement?.querySelector(".faq-a");
      if (panel) panel.hidden = expanded ? true : false;
    });

    btn.addEventListener("keydown", (e) => {
      const key = e.key;
      if (key !== "Enter" && key !== " ") return;
      e.preventDefault();
      btn.click();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initFaq();
});

