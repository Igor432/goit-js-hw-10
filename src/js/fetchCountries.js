
import Notiflix from 'notiflix';



function fetchCountries(name) {

    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages,currencies`)
        .then(response => {
            if (!response.ok) {

                Notiflix.Notify.failure('Oops, there is no country with that name');
            }
            return response.json()
        }
        )
}

export { fetchCountries }







