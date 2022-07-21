
import debounce from "lodash.debounce";
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const countryList = document.querySelector('.country_list');
const countryInput = document.querySelector('input');
const countryInfo = document.querySelector('.country-info');



function fetchCountries(name) {

    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages,currencies`)
        .then(response => {
            if (!response.ok) {

                Notiflix.Notify.failure("Oops, there is no country with that name")

            }
            return response.json()
        }
        )
}

function makeList(countries) {

    console.log(countries)

    if (countries.length > 10) {
        Notiflix.Notify.info('"Too many matches found. Please enter a more specific name."');
    } else if (countries.length >= 2 && countries.length < 10) {
        const list = countries
            .map(({ name, flags }) => {
                return `
            <li> <img src=${flags.svg} height='20px' width='30px'> ${name} </li>`
            }).join("")
        countryInfo.innerHTML = list;
    } else {
        const list = countries
            .map(({ name, capital, population, flags, languages, currencies }) => {
                return `<li>Name: ${name}</li>
            <li>Capital: ${capital}</li>
            <li>Populatio: ${population} </li>
            
            <li>Languages: ${languages[0].name}</li>
            <li>Currency: ${currencies[0].name}</li>
            <li> <img src=${flags.svg} height='60px' width='90px'></li>`
            }).join("");
        countryInfo.innerHTML = list;
    }
}


countryInput.addEventListener('input', debounce(() => {
    inputText = countryInput.value

    if (inputText === '') {
        countryInfo.innerHTML = '';
    } else {
        fetchCountries(inputText)
            .then((countries) => makeList(countries))

    }
}, 300))








