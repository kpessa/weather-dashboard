const kelvinToFahrenheit = kelvin => ((kelvin - 273.15) * 9) / 5 + 32;

const getCities = () => {
  var citiesStr = localStorage.getItem('cities');
  var cities;
  citiesStr ? (cities = JSON.parse(citiesStr)) : (cities = []);
  return cities;
};

const toTitleCase = str => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// !  -----------------------
// ! Set UV Index color
// ! ------------------------
const setUVIndexColor = num => {
  var color;
  $('#uvindex').css('color', 'white');

  if (num <= 2) {
    color = 'green';
  } else if (num <= 5) {
    color = 'yellow';
    $('#uvindex').css('color', 'black');
  } else if (num <= 7) {
    color = 'orange';
  } else if (num <= 10) {
    color = 'red';
  } else if (num > 10) {
    color = 'purple';
  }

  $('#uvindex').css('background-color', color);
};

// !  -----------------------
// ! Setting SideBar Cities
// ! ------------------------
const setSideBarCities = () => {
  $('#recentCities').html('');
  for (var i = 0; i < Math.min(cities.length, 10); i++) {
    var tr = $('<tr>');
    var td = $('<td>').text(toTitleCase(cities[i]));
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

// !  -----------------------
// ! Show Failure Message
// ! ------------------------
const showFailureMessage = () => {
  $('#alert--failure').fadeIn();
  $('#alert--failure').slideDown(1500);
  setTimeout(() => {
    $('#alert--failure').fadeOut();
    $('#alert--failure').slideUp(1500);
  }, 3000);
};
