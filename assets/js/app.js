let cities = getCities();

setSideBarCities();

const fetchCity = cityName => {
  cityName = toTitleCase(cityName);
  let API_KEY = $('#secret').text().trim();
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  fetch(apiURL)
    .then(response => {
      // console.log(response);
      response.json().then(data => {
        if (!response.ok) {
          showFailureMessage();
        } else if (response.ok) {
          showSuccessMessage();
          $('input').val('');
          if (!cities.includes(cityName) && response.ok) {
            cities.unshift(cityName);
            localStorage.setItem('cities', JSON.stringify(cities));
          }

          setSideBarCities();

          // !  -----------------------
          // ! Setting Current Weather
          // ! ------------------------

          $('#city').text(data.name);
          $('#cityIcon').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
          $('#temperature').text(`${kelvinToFahrenheit(data.main.temp).toFixed(1)} F`);
          $('#humidity').text(`${data.main.humidity}%`);
          $('#windspeed').text(`${data.wind.speed.toFixed(1)} MPH`);

          var lon = data.coord.lon;
          var lat = data.coord.lat;

          // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
          var apiURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}`;

          fetch(apiURL2).then(response2 => {
            response2.json().then(data2 => {
              // console.log(data2);
              $('#uvindex').text(`${data2.current.uvi}`); // Set UV-index
              setUVIndexColor(data2.current.uvi);

              // !  -----------------------
              // ! Setting 5-Day Forecast
              // ! ------------------------
              $('#fiveDay').html('');
              for (var i = 1; i < 6; i++) {
                var div = $('<div>');
                div.addClass('');
                var card = $('<div>');
                div.addClass('card bg-primary text-light');

                var h3 = $('<h3>').text(new Date(data2.daily[i].dt * 1000).toLocaleDateString());
                var img = $('<img>');
                img.attr('src', `http://openweathermap.org/img/w/${data2.daily[i].weather[0].icon}.png`);
                var p1 = $('<p>');
                p1.text(`Temp: ${kelvinToFahrenheit(data2.daily[i].temp.day).toFixed(1)} F`);
                var p2 = $('<p>');
                p2.text(`Humidity: ${data2.daily[i].humidity}%`);
                p2.addClass('mb-0');

                card.append(h3).append(img).append(p1).append(p2);
                div.append(card);
                $('#fiveDay').append(div);
              }
            });
          });
        }
      });
    })
    .catch(error => {
      showFailureMessage();
    });
};

function submitHandler(event) {
  event.preventDefault();

  var cityName = $('input').val();

  if (cityName) {
    fetchCity(cityName);
    $('input').value = '';
  }
}

const recentCitiesClickHandler = event => {
  var cityName = event.target.textContent;
  if (cityName) fetchCity(cityName);
};

$('form').submit(submitHandler);
$('#recentCities').on('click', 'td', recentCitiesClickHandler);
