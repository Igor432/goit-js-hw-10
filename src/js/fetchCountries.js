
import debounce from "lodash.debounce";

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
        .map(({ name, capital, population, flag, languages, currencies }) => {
            return `<li>${name}</li>
            <li>${capital}</li>
            <li>${population}</li>
            <li>${flag}</li>
            <li>${languages}</li>
            <li>${currencies}</li>`
        })
    countryInfo.innerHTML = list;
}




countryInput.addEventListener('input', (evt) => {

    fetchCountries(evt.currentTarget.value)
        .then((countries) => makeList(countries))

})








