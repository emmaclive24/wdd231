document.addEventListener("DOMContentLoaded", () => {
  // Set the hidden timestamp field
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Handle modal open buttons
  document.querySelectorAll("button[onclick^='openModal']").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const idMatch = button.getAttribute("onclick").match(/'([^']+)'/);
      if (idMatch && idMatch[1]) {
        const modal = document.getElementById(idMatch[1]);
        if (modal) modal.style.display = "flex";
      }
    });
  });

  // Handle modal close buttons
  document.querySelectorAll(".modal .close").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
      const modal = closeBtn.closest(".modal");
      if (modal) modal.style.display = "none";
    });
  });

  // Optional: Close modal if clicked outside modal content
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});
