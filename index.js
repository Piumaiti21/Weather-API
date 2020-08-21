//api key
const key ='73faa414a789c07612180f739ce41cc2';
const proxy='https://cors-anywhere.herokuapp.com/';
//requesting city data from the api

const requestCity = async (city) => {
    const baseURL = `${proxy}http://api.openweathermap.org/data/2.5/weather`;
    const query = `?q=${city}&appid=${key}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    return data;

}
// query selectors
const form = document.querySelector('.search-location');
const citySearched = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const information = document.querySelector('.body-section');
const backgroundImage=document.querySelector('.top-section img');

// DOM manipulation(updates)
updateWeather = (data) => {
    console.log(data);
    cityName.textContent = data.name;
    const iconName=data.weather[0].icon;
    information.innerHTML =   `
    <div class="mid-section row">
                    <div class="col-8 text-center temperature">
                        <span>${kelvinToCelsius(data.main.temp)}&deg;C</span>
                    
                    </div>
                    <div class="col-4 temperature-condition">

                        <p class="high">${kelvinToCelsius(data.main.temp_max)}&deg;C</p>
                        <p class="low">${kelvinToCelsius(data.main.temp_min)}&deg;C</p>
                    </div>
                </div>
                <div class="icon-section   text-center ">
                    <img class="icon" src="icons/${data.weather[0].icon}.png" alt="">
                    <p>${data.weather[0].description}</p>

                </div>
                <div class="bottom-section  px-5 py-4 row">
                    <div class="col text-center">
                        <p>${kelvinToCelsius(data.main.feels_like)}&deg;C</p>
                        <span>Feels like</span>
                    </div>
                    <div class="col text-center">
                        <p>${data.main.humidity}%</p>
                        <span>Humidity</span>
                    </div>

                </div>
    `;
    // day/night background change
    if (checkDay(iconName)) {
        console.log('day');
        backgroundImage.setAttribute('src', 'img/day_image.svg');}
        else{
            console.log('night');
            backgroundImage.setAttribute('src', 'img/night_image.svg');
        }
};

// celcius conversion
const kelvinToCelsius=(k)=>{
    C=Math.round(k-273.15);
    return C;
};

// function to check day or night
const checkDay=(icon)=>{
    if (icon.includes('d')) { return true }
    else { return false }

};
// getting  city value from the input box and connecting the city to weather api
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityValue = citySearched.value.trim();
    console.log(cityValue);
    form.reset();
    requestCity(cityValue)
        .then((data) => {
            updateWeather(data);
        })
        .catch((error) => { console.log(error) });
});

