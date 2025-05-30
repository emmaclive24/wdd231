const params = new URLSearchParams(window.location.search);
const fields = ["firstname", "lastname", "email", "phone", "organization", "timestamp"];
const display = document.getElementById("submitted-data");

fields.forEach(field => {
  const value = params.get(field);
  if (value) {
    const formatted = field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, str => str.toUpperCase());
    const p = document.createElement("p");
    p.innerHTML = `<strong>${formatted}:</strong> ${value}`;
    display.appendChild(p);
  }
});
