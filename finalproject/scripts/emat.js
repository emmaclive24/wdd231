// emat.js
function calculateTotal() {
  const distance = parseFloat(document.getElementById('distance').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const total = distance * rate;
  document.getElementById('total').textContent = isNaN(total) ? 'Enter valid numbers' : `Total: $${total.toFixed(2)}`;
}

function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();
