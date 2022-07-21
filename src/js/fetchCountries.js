
import debounce from "lodash.debounce";
var debounce = require('lodash.debounce');

const countryList = document.querySelector('.country_list');
const countryInput = document.querySelector('input');
const countryInfo = document.querySelector('.country-info');





function fetchCountries(name) {

    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages,currencies`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        }
        )

}


function makeList(countries) {

    const list = countries
        .map(({ name, capital, population, flags, languages, currencies }) => {
            return `<li>Name: ${name}</li>
            <li>Capital: ${capital}</li>
            <li>Populatio: ${population} </li>
            
            <li>Languages: ${languages[0].name}</li>
            <li>Currency: ${currencies[0].name}</li>
            <li> <img src=${flags.svg} height='60px' width='90px'></li>`
        })
    countryInfo.innerHTML = list;
    console.log(countries)
}




countryInput.addEventListener('input', debounce(() => {

    inputText = countryInput.value
    fetchCountries(inputText)
        .then((countries) => makeList(countries))

}, 300))








