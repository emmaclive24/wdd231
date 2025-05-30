const myTown= document.querySelector ("#town");
const myDescription= document.querySelector ("#description");
const myTemperature = document.querySelector("#temperature");
const myHumidity = document.querySelector("#humidity");
const myGraphic = document.querySelector("#graphic");

const myKey = "f8edbbf29e74ee98ed602915e69861ff"; // Replace with your actual API key
const myLat = "21.161930452605848"; // Replace with your chamber's city
const myLon = "-86.85141139043687"; // Use 'metric' for Celsius

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayResults(data); // uncomment when ready
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  function displayResults(data){
    myTown.innerHTML = data.name
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;F`
    myHumidity.innerHTML = data.main.humidity
    const iconSrc = `https://openweathermap.org/img/wn${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute('SRC', iconSrc)
    myGraphic.setAttribute("alt", data.weather[0].description )
  }
  // backticks ``
  
apiFetch();

