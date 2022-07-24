import debounce from "lodash.debounce";
let debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries } from "./fetchCountries";

const countryList = document.querySelector('.country_list');
const countryInput = document.querySelector('input');
const countryInfo = document.querySelector('.country-info');


function makeList(countries) {

    let allLang = [];
    let list = '';
    console.log(countries)

    if (countries.length > 10) {
        Notiflix.Notify.info('"Too many matches found. Please enter a more specific name."');
    } else if (countries.length >= 2 && countries.length <= 10) {
        list = countries
            .map(({ name, flags }) => {

                return `
            <li> <img src=${flags.svg} height='20px' width='30px'> ${name} </li>`
            }).join("")
        countryInfo.innerHTML = list;

    } else if (countries.length === 1) {
        list = countries
            .map((country) => {

                for (let lang of country.languages) {
                    const langs = Object.values(lang)
                    allLang.push(langs[3])

                }

                return `<li class='list_item'> <img src=${country.flags.svg} height='40px' width='60px'><span class='list_title name'> ${country.name}</span></li>
            <li class='list_item'><span class='list_title'>Capital:</span> ${country.capital}</li>
            <li class='list_item'><span class='list_title'>Population:</span> ${country.population} </li>
            
            <li class='list_item'><span class='list_title'>Languages:</span> ${allLang.join(', ')}</li >
            <li class='list_item'><span class='list_title'>Currency:</span> ${country.currencies[0].name}</li>
            `
            }).join("");

    }
    countryInfo.innerHTML = list;
}


countryInput.addEventListener('input', debounce(() => {
    var inputText = countryInput.value

    if (inputText === '') {
        countryInfo.innerHTML = '';
    } else {
        fetchCountries(inputText)
            .then(countries => makeList(countries))

            ;
    }
}, 300))
