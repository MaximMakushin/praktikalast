//динамический список жанров
const genreList = async function () {
  try {
    const response = await fetch(`http://de1.api.radio-browser.info/json/tags`);
    console.log(response.status);
    if (!response.ok) {
      throw new Error(`Ссылка не найдена. Ошибка: ${response.status}`);
    }
    const genres = await response.json();
    const listOfGenres = document.querySelector("#genre_list");
    for (let i of genres) {
      let option = `<option value="${i.name}">${i.name}</option>`;
      listOfGenres.insertAdjacentHTML("beforeend", option);
    }
    countryList();
  } catch (error) {
    alert(error);
  }
};
document.addEventListener("DOMContentLoaded", genreList);

//динамический список стран
const countryList = async function () {
  try {
    tag = document.querySelector("#genres").value;
    const response = await fetch(
      `http://de1.api.radio-browser.info/json/stations/bytag/${tag}`
    );
    console.log(response.status);
    if (!response.ok) {
      throw new Error(`Ссылка не найдена. Ошибка: ${response.status}`);
    }
    const countryes = await response.json();
    const listOfCountries = document.querySelector(`#country_list`);
    const countrys = [];
    for (let i of countryes) {
      if (!countrys.includes(i.country) && i.country.length > 1) {
        countrys.push(i.country);
      }
    }
    for (let item of countrys) {
      let option = `<option value="${item}">${item}</option>`;
      listOfCountries.insertAdjacentHTML(`beforeend`, option);
    }
  } catch (err) {
    alert(err);
  }
};

//добавляем событие на кнопку и создаём функцию, которая открывает радио по выбранной стране и тегу
const btn = document.querySelector(".btn");
btn.addEventListener("click", openRadio);

async function openRadio() {
  try {
    tag = document.querySelector("#genres").value;
    country = document.querySelector("#countrys").value;
    const response = await fetch(
      ` http://de1.api.radio-browser.info/json/stations/bycountry/${country}`
    );
    console.log(response.status);
    if (!response.ok)
      throw new Error(`Ссылка не найдена. Ошибка: ${response.status}`);
    const radiostation = await response.json();
    getValue(radiostation, tag);
  } catch (error) {
    alert(error);
  }
}

function getValue(arr, tag) {
  let i = 0;
  while (i < arr.length) {
    if (arr[i].tags.includes(tag)) {
      window.open(arr[i].homepage).focus();
      return;
    }
    i++;
  }
}
