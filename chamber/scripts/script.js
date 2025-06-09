
// Weather API configuration
const WEATHER_API_KEY = '67c6c0b8d4cd90cc24f98a42bef1ae4f'; // OpenWeatherMap API key
const CITY = 'Clive,IA,US';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${WEATHER_API_KEY}&units=imperial`;
const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${WEATHER_API_KEY}&units=imperial`;

// Member data - simulating JSON data source
const membersData = [
    {
        id: 1,
        name: "Tech Solutions Inc",
        membership: "gold",
        logo: "images/tech-logo.png",
        phone: "(515) 555-0101",
        website: "www.techsolutions.com",
        address: "123 Tech Drive, Clive, IA"
    },
    {
        id: 2,
        name: "Green Valley Landscaping",
        membership: "silver",
        logo: "images/green-logo.png",
        phone: "(515) 555-0102",
        website: "www.greenvalley.com",
        address: "456 Garden Street, Clive, IA"
    },
    {
        id: 3,
        name: "Clive Auto Repair",
        membership: "gold",
        logo: "images/auto-logo.png",
        phone: "(515) 555-0103",
        website: "www.cliveauto.com",
        address: "789 Main Street, Clive, IA"
    },
    {
        id: 4,
        name: "Downtown Dental",
        membership: "silver",
        logo: "images/dental-logo.png",
        phone: "(515) 555-0104",
        website: "www.downtowndental.com",
        address: "321 Center Avenue, Clive, IA"
    },
    {
        id: 5,
        name: "Clive Financial Services",
        membership: "gold",
        logo: "images/financial-logo.png",
        phone: "(515) 555-0105",
        website: "www.clivefinancial.com",
        address: "654 Business Blvd, Clive, IA"
    },
    {
        id: 6,
        name: "Prairie Home Construction",
        membership: "silver",
        logo: "images/construction-logo.png",
        phone: "(515) 555-0106",
        website: "www.prairiehome.com",
        address: "987 Builder Lane, Clive, IA"
    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    fetchWeatherData();
    displayMemberSpotlight();
    updateFooterDates();
});

// Navigation functionality
function initializeNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navigation.classList.toggle('active');
        const isExpanded = navigation.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Animate hamburger menu
        const hamburgers = menuToggle.querySelectorAll('.hamburger');
        if (isExpanded) {
            hamburgers[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburgers[1].style.opacity = '0';
            hamburgers[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            hamburgers.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu
                navigation.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger menu
                const hamburgers = menuToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
                
                // Update active state
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !navigation.contains(event.target)) {
            navigation.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            const hamburgers = menuToggle.querySelectorAll('.hamburger');
            hamburgers.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
}

// Weather API functions
async function fetchWeatherData() {
    try {
        // Fetch current weather
        const currentResponse = await fetch(WEATHER_API_URL);
        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        // Fetch forecast
        const forecastResponse = await fetch(FORECAST_API_URL);
        const forecastData = await forecastResponse.json();
        displayWeatherForecast(forecastData);
    } catch (error) {
        console.log('Weather API not available, using fallback data');
        displayFallbackWeather();
    }
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);

    currentWeatherDiv.innerHTML = `
        <div class="weather-current">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="weather-icon">
            <div class="weather-info">
                <h4>${temp}°F</h4>
                <p class="weather-description">${description}</p>
                <div class="weather-details">
                    <p>High: ${high}° | Low: ${low}°</p>
                    <p>Humidity: ${humidity}%</p>
                </div>
            </div>
        </div>
    `;
}

function displayWeatherForecast(data) {
    const forecastDiv = document.getElementById('weather-forecast');
    const forecastList = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);
    
    const forecastHTML = forecastList.map(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(item.main.temp);
        const icon = item.weather[0].icon;
        const description = item.weather[0].description;
        
        return `
            <div class="forecast-day">
                <span>${dayName}</span>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" width="30" height="30">
                    <span>${temp}°F</span>
                </div>
            </div>
        `;
    }).join('');
    
    forecastDiv.innerHTML = forecastHTML;
}

function displayFallbackWeather() {
    const currentWeatherDiv = document.getElementById('current-weather');
    const forecastDiv = document.getElementById('weather-forecast');
    
    currentWeatherDiv.innerHTML = `
        <div class="weather-current">
            <img src="images/weather_icon.svg" alt="Sunny weather" class="weather-icon">
            <div class="weather-info">
                <h4>72°F</h4>
                <p class="weather-description">Partly Cloudy</p>
                <div class="weather-details">
                    <p>High: 85° | Low: 52°</p>
                    <p>Humidity: 34%</p>
                </div>
            </div>
        </div>
    `;
    
    forecastDiv.innerHTML = `
        <div class="forecast-day">
            <span>Today</span>
            <span>85°F</span>
        </div>
        <div class="forecast-day">
            <span>Tomorrow</span>
            <span>78°F</span>
        </div>
        <div class="forecast-day">
            <span>Wednesday</span>
            <span>68°F</span>
        </div>
    `;
}

// Member spotlight functionality
function displayMemberSpotlight() {
    const spotlightDiv = document.getElementById('member-spotlight');
    
    // Filter gold and silver members
    const eligibleMembers = membersData.filter(member => 
        member.membership === 'gold' || member.membership === 'silver'
    );
    
    // Randomly select 2-3 members
    const numberOfMembers = Math.floor(Math.random() * 2) + 2; // 2 or 3 members
    const selectedMembers = getRandomMembers(eligibleMembers, numberOfMembers);
    
    const membersHTML = selectedMembers.map(member => `
        <div class="member-card">
            <img src="${member.logo}" alt="${member.name} logo" class="member-logo" 
                 onerror="this.src='images/default-logo.png'">
            <h3>${member.name}</h3>
            <span class="membership-level ${member.membership}">${member.membership.toUpperCase()}</span>
            <div class="member-contact">
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> ${member.website}</p>
                <p><strong>Address:</strong> ${member.address}</p>
            </div>
        </div>
    `).join('');
    
    spotlightDiv.innerHTML = membersHTML;
}

function getRandomMembers(members, count) {
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Footer date functions
function updateFooterDates() {
    const copyrightYear = document.getElementById('copyright-year');
    const lastModified = document.getElementById('last-modified');
    
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
    
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
}

// Intersection Observer for animations
const observeElements = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.current-events, .weather-section, .member-spotlight');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
};

// Initialize animations after DOM is loaded
document.addEventListener('DOMContentLoaded', observeElements);