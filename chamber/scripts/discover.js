document.addEventListener("DOMContentLoaded", () => {
    loadCards();
    displayVisitMessage();
});

async function loadCards() {
    const response = await fetch("data/discover.json");
    const data = await response.json();

    const container = document.getElementById("cardContainer");
    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure><img src="${item.image}" alt="${item.title}" loading="lazy"></figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;
        container.appendChild(card);
    });
}

function displayVisitMessage() {
    const messageArea = document.getElementById("visitMessage");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        messageArea.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSince = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        if (daysSince < 1) {
            messageArea.textContent = "Back so soon! Awesome!";
        } else {
            messageArea.textContent = `You last visited ${daysSince} ${daysSince === 1 ? "day" : "days"} ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
}
