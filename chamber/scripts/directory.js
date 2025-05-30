// Directory data
const members = [
    {
        name: "Timbuktu Traders",
        address: "123 Market Street, Timbuktu, MAI 999",
        phone: "800-555-1001",
        website: "www.timbuktutraders.com",
        image: "images/traders.jpeg",
        membership: 3,
        description: "Local marketplace for unique goods"
    },
    {
        name: "Sahara Sands Hotel",
        address: "45 Oasis Road, Timbuktu, MAI 999",
        phone: "800-555-1002",
        website: "www.saharasands.com",
        image: "images/hotel.png",
        membership: 2,
        description: "Luxury accommodations in the heart of Timbuktu"
    },
    {
        name: "Nomad's Rest Cafe",
        address: "67 Caravan Lane, Timbuktu, MAI 999",
        phone: "800-555-1003",
        website: "www.nomadsrest.com",
        image: "images/cafe.jpeg",
        membership: 1,
        description: "Authentic local cuisine and beverages"
    },
    {
        name: "Golden Dunes Tours",
        address: "89 Desert Way, Timbuktu, MAI 999",
        phone: "800-555-1004",
        website: "www.goldendunestours.com",
        image: "images/tours.jpeg",
        membership: 3,
        description: "Guided tours of the Sahara"
    },
    {
        name: "Timbuktu Textiles",
        address: "101 Weaver's Alley, Timbuktu, MAI 999",
        phone: "800-555-1005",
        website: "www.timbuktutextiles.com",
        image: "images/textiles.jpeg",
        membership: 2,
        description: "Traditional fabrics and clothing"
    },
    {
        name: "Oasis Tech Solutions",
        address: "202 Silicon Dunes, Timbuktu, MAI 999",
        phone: "800-555-1006",
        website: "www.oasistech.com",
        image: "images/tech.png",
        membership: 1,
        description: "IT services for local businesses"
    },
    {
        name: "Camel Caravans Ltd",
        address: "303 Expedition Road, Timbuktu, MAI 999",
        phone: "800-555-1007",
        website: "www.camelcaravans.com",
        image: "images/caravans.jpeg",
        membership: 3,
        description: "Transportation and logistics services"
    }
];

// Display members in the directory
function displayMembers(view = 'grid') {
    const container = document.getElementById('member-cards');
    container.className = view === 'grid' ? 'grid-view' : 'list-view';
    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';

        let membershipLevel = '';
        switch (member.membership) {
            case 1:
                membershipLevel = 'Member';
                break;
            case 2:
                membershipLevel = 'Silver Member';
                break;
            case 3:
                membershipLevel = 'Gold Member';
                break;
        }

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="https://${member.website}" target="_blank">${member.website}</a></p>
            <span class="member-level">${membershipLevel}</span>
        `;

        if (view === 'list') {
            card.style.display = 'flex';
            card.style.flexDirection = 'row';
            card.style.gap = '1rem';
            card.style.alignItems = 'center';
            card.querySelector('img').style.width = '100px';
            card.querySelector('img').style.height = '100px';
            card.querySelector('img').style.objectFit = 'cover';
        }

        container.appendChild(card);
    });
}

// Toggle between grid and list view
document.getElementById('grid-view').addEventListener('click', () => {
    document.getElementById('grid-view').classList.add('active');
    document.getElementById('list-view').classList.remove('active');
    displayMembers('grid');
});

document.getElementById('list-view').addEventListener('click', () => {
    document.getElementById('list-view').classList.add('active');
    document.getElementById('grid-view').classList.remove('active');
    displayMembers('list');
});

// Mobile menu toggle
document.getElementById('menu-button').addEventListener('click', () => {
    document.querySelector('.navigation').classList.toggle('open');
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayMembers();
});


document.getElementById('menu-button').addEventListener('click', function () {
    const nav = document.getElementById('navigation');
    nav.classList.toggle('show');
});

// View toggle functionality
// document.getElementById('grid-view').addEventListener('click', function () {
//     document.getElementById('member-cards').className = 'grid-view';
//     document.getElementById('grid-view').classList.add('active');
//     document.getElementById('list-view').classList.remove('active');
// });

// document.getElementById('list-view').addEventListener('click', function () {
//     document.getElementById('member-cards').className = 'list-view';
//     document.getElementById('list-view').classList.add('active');
//     document.getElementById('grid-view').classList.remove('active');
// });

// Toggle mobile menu
const menuButton = document.getElementById('menu-button');
const navigation = document.getElementById('navigation');
const overlay = document.querySelector('.overlay');

menuButton.addEventListener('click', function () {
    navigation.classList.toggle('show');
    overlay.classList.toggle('show');
});

// Close menu when clicking overlay
overlay.addEventListener('click', function () {
    navigation.classList.remove('show');
    overlay.classList.remove('show');
});

document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu-button');
    const navigation = document.getElementById('navigation');
    const overlay = document.querySelector('.overlay');

    // Toggle menu
    menuButton.addEventListener('click', function () {
        navigation.classList.toggle('show');
        overlay.classList.toggle('show');
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function () {
        navigation.classList.remove('show');
        overlay.classList.remove('show');
    });
});