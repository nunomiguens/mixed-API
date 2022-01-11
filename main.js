import './style.css';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const GEOLOCATION_URL =
  'https://ip-geo-location.p.rapidapi.com/ip/check?format=json';
const GEOLOCATION_HOST = 'ip-geo-location.p.rapidapi.com';

const WEATHER_URL =
  'https://community-open-weather-map.p.rapidapi.com/weather?units=metric&q=';
const WEATHER_HOST = 'community-open-weather-map.p.rapidapi.com';

const CHUCKNORRIS_URL =
  'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random?category=dev';
const CHUCKNORRIS_HOST = 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com';

const NEWS_URL = 'https://current-news.p.rapidapi.com/news';
const NEWS_HOST = 'current-news.p.rapidapi.com';

const getData = async (url, host) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': host,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status ${response.status}`);
  }

  return await response.json();
};

const runApiQueries = async () => {
  const app = document.getElementById('app');
  // GET CITY NAME
  const geoData = await getData(GEOLOCATION_URL, GEOLOCATION_HOST);
  console.log(geoData);
  // GET WEATHER DATA BY CITY
  const weatherData = await getData(
    WEATHER_URL + geoData.area.name,
    WEATHER_HOST
  );
  console.log(weatherData);

  // UPDATE UI WITH DATA
  app.innerHTML +=
    /*html*/
    `
  <div class=" flex items-center justify-center">
  <div class="bg-white p-6  rounded-3xl flex space-x-12 items-center shadow-md">
    
    <div>
      <p class="text-7xl font-bold text-right text-gray-900">${parseInt(
        weatherData.main.temp
      )}º </p>
      <p class="text-gray-500 text-sm">${weatherData.name}</p>
    </div>
    
    <div>
    
      <p class="text-center text-gray-500 mt-2 text-m">${weatherData.weather[0].main.toUpperCase()}</p>
      <p class="text-center text-gray-500 mt-2 text-xs">${
        weatherData.weather[0].description
      }</p>
      </div>
      <img class='self-center h-15 w-15'
    src='http://openweathermap.org/img/wn/${
      weatherData.weather[0].icon
    }@2x.png' alt='weather icon'/>    
  </div> 
</div>
  
  `;

  // GET CHUCK NORRIS JOKES
  const chuckData = await getData(CHUCKNORRIS_URL, CHUCKNORRIS_HOST);
  console.log(chuckData);

  // UPDATE UI WITH DATA
  app.innerHTML +=
    /*html*/
    `
    <div class=" bg-gray-100 grid items-center justify-center">
    <div class="p-6 bg-white flex items-center space-x-6 rounded-3xl shadow-md ">
      <div>
      <img class='h-15 w-15'
      src='${chuckData.icon_url}'/>
      <p class="text-center text-gray-500 mt-2 text-xs">Boss</p>
      </div>
      <div>
        <h1 class="text-xl font-bold text-gray-700 mb-2">Chuck Norris Jokes</h1>
        <p class="text-gray-600 w-80 text-sm">"${chuckData.value}"</p>
      </div>
    </div>
  </div>
  
  `;

  // GET NEWS DATA
  const newsData = await getData(NEWS_URL, NEWS_HOST);
  console.log(newsData);

  // UPDATE UI WITH DATA
  Object.values(newsData.news).forEach(article => {
    console.log(article);
    app.innerHTML +=
      /*html*/
      `
<div class=" bg-gray-100 grid items-center justify-center">
<div class="p-6 bg-white flex items-center space-x-6 rounded-3xl shadow-md ">
  <div>
  <img class='h-auto w-48 flex-none rounded-l object cover'
  src='${article.urlToImage}'>

  </div>
  <div>
    <h1 class="text-xl font-bold text-gray-700 mb-2">
    <p class="text-gray-600 w-80 text-sm">${article.title}</p>
  </div>
</div>
</div>  
`;
  });
};

runApiQueries();
