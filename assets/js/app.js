var form = document.querySelector('form');
var inputCity = document.querySelector('input');

const submitHandler = event => {
  event.preventDefault();

  if (inputCity.value) {
    console.log(inputCity.value);
  }

  inputCity.value = '';
};

form.onsubmit = submitHandler;
