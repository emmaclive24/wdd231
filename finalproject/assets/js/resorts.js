use strict';

/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const header = document.querySelector("[data-header]");

if (navToggleBtn && header) {
  navToggleBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    header.classList.toggle("active");
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector("[data-nav-toggle-btn]");
  const nav = document.querySelector(".navbar");
  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});

/**
 * show go top btn when scroll window to 500px
 */

const goTopBtn = document.querySelector("[data-go-top]");

if (goTopBtn) {
  window.addEventListener("scroll", function () {
    window.scrollY >= 500 ? goTopBtn.classList.add("active")
      : goTopBtn.classList.remove("active");
  });
}

// Resort loading functionality
async function loadResorts(containerId, modalId) {
  const container = document.getElementById(containerId);
  const modal = document.getElementById(modalId);
  
  if (!container || !modal) {
    console.error('Container or modal not found');
    return;
  }
  
  const modalContent = modal.querySelector(".modal-body");
  const modalClose = modal.querySelector(".modal-close");

  try {
    console.log('Loading resorts...');
    
    // Try different possible paths for the JSON file
    let response;
    const possiblePaths = [
      "./data/resorts.json",
      "./assets/data/resorts.json",
      "data/resorts.json",
      "assets/data/resorts.json"
    ];
    
    let lastError;
    for (const path of possiblePaths) {
      try {
        response = await fetch(path);
        if (response.ok) {
          console.log(`Successfully loaded from: ${path}`);
          break;
        }
      } catch (e) {
        lastError = e;
        console.log(`Failed to load from: ${path}`);
        continue;
      }
    }

    if (!response || !response.ok) {
      throw new Error(`HTTP error! status: ${response?.status || 'File not found'}`);
    }

    const resorts = await response.json();
    console.log('Resorts loaded successfully:', resorts);

    // Add fake data for demo
    const provinces = [
      "Matabeleland North", "Matabeleland South", "Manicaland",
      "Mashonaland West", "Masvingo", "Harare", "Bulawayo", "Mashonaland East"
    ];

    container.innerHTML = "";

    resorts.forEach((resort, index) => {
      const province = provinces[index % provinces.length];
      const rating = (Math.random() * 2 + 3).toFixed(1);
      const id = `resort-${index}`;

      const card = document.createElement("div");
      card.classList.add("resort-card");
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `View details for ${resort.name}`);

      // Add event to open modal
      card.addEventListener("click", () => {
        openModal(resort.name, resort.address, province, rating);
      });

      card.innerHTML = `
        <h3>${resort.name}</h3>
        <p><strong>Address:</strong> ${resort.address}</p>
        <p><strong>Province:</strong> ${province}</p>
        <p><strong>Rating:</strong> ⭐ ${rating}</p>
      `;

      container.appendChild(card);
    });

    function openModal(name, address, province, rating) {
      modalContent.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Province:</strong> ${province}</p>
        <p><strong>Rating:</strong> ⭐ ${rating} / 5</p>
      `;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    }

    if (modalClose) {
      modalClose.addEventListener("click", () => {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
      }
    });

  } catch (error) {
    console.error("Resort loading failed:", error);
    container.innerHTML = "<p class='error'>Unable to load resort data. Please check if the JSON file exists at the correct path.</p>";
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing resorts...');
  loadResorts("resort-list", "resortModal");
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadResorts };
}
