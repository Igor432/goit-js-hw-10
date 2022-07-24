import debounce from "lodash.debounce";
let debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries } from "./fetchCountries";

const countryList = document.querySelector('.country_list');
const countryInput = document.querySelector('input');
const countryInfo = document.querySelector('.country-info');


function makeList(countries) {
    let allLang = [];
    console.log(countries)

    if (countries.length > 10) {
        Notiflix.Notify.info('"Too many matches found. Please enter a more specific name."');
    } else if (countries.length >= 2 && countries.length <= 10) {
        const list = countries
            .map(({ name, flags }) => {
                return `
            <li> <img src=${flags.svg} height='20px' width='30px'> ${name} </li>`
            }).join("")
        countryInfo.innerHTML = list;

    } else {


        const list = countries.map(({ name, capital, population, flags, languages, currencies }) => {
            for (let lang of languages) {
                allLang.push(lang.name)
            }

            return `<li class='list_item'> <img src=${flags.svg} height='40px' width='60px'><span class='list_title name'> ${name}</span></li>
            <li class='list_item'><span class='list_title'>Capital:</span> ${capital}</li>
            <li class='list_item'><span class='list_title'>Population:</span> ${population} </li>
            
            <li class='list_item'><span class='list_title'>Languages:</span> ${allLang.join(', ')}</li >
            <li class='list_item'><span class='list_title'>Currency:</span> ${currencies[0].name}</li>
            `
        }).join("");
        countryInfo.innerHTML = list;
    }
}


countryInput.addEventListener('input', debounce(() => {
    var inputText = countryInput.value

    if (inputText === '') {
        countryInfo.innerHTML = '';
    } else {
        fetchCountries(inputText)
            .then((countries) => makeList(countries))
            .catch(error => console.log(error));
    }
}, 300))
