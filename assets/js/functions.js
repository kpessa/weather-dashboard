const kelvinToFahrenheit = kelvin => ((kelvin - 273.15) * 9) / 5 + 32;

const getCities = () => {
  var citiesStr = localStorage.getItem('cities');
  var cities;
  citiesStr ? (cities = JSON.parse(citiesStr)) : (cities = []);
  return cities;
};

// !  -----------------------
// ! Setting SideBar Cities
// ! ------------------------
const setSideBarCities = () => {
  $('#recentCities').html('');
  for (var i = 0; i < Math.min(cities.length, 5); i++) {
    var tr = $('<tr>');
    var td = $('<td>').text(cities[i]);
    tr.append(td);
    $('#recentCities').append(tr);
  }
};

// !  -----------------------
// ! Show Success Message
// ! ------------------------
const showSuccessMessage = () => {
  $('#alert').fadeIn();
  $('#alert').slideDown(700);
  setTimeout(() => {
    $('#alert').fadeOut();
    $('#alert').slideUp(700);
  }, 1500);
};
