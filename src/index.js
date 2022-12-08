import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY))

function onCountryInput() {
  const name = countryInput.value.trim()
  if (name === '') {
    return (countryList.innerHTML = ''), (countryInfo.innerHTML = '')
  }

  fetchCountries(name)
    .then(countries => {
      countryList.innerHTML = ''
      countryInfo.innerHTML = ''
      if (countries.length === 1) {
        countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
        countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries))
      } else if (countries.length >= 10) {
        alertTooManyMatches()
      } else {
        countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
      }
    })
    .catch(alertWrongName)
}

function renderCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `
    })
    .join('')
  return markup
}

function renderCountryInfo(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
        </ul>
        `
    })
    .join('')
  return markup
}

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name')
}

function alertTooManyMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}

// VARIANT 1

// searchInputEl.addEventListener(
//     'input', debounce(ev => {
//         ev.preventDefault();

//         const countryName = ev.target.value.trim();
//         // const countryName = ev.currentTarget.elements.search - box.value;
//         console.log(countryName);

//         if (countryName === '') {
//             return;
//         }

//         fetchCountries(countryName)
//             .then(data => {
//                 console.log(data);

//                 if (data.length > 10) {
//                     console.log(data.length > 10);
//                     Notiflix.Notify.info(
//                         'Too many matches found. Please enter a more specific name.'
//                     );
//                 }
//             })

//             .catch(error => {
//                 if (error.message === '404') {
//                     Notiflix.Notify.info(
//                         'Oops, there is no country with that name.'
//                     );
//                 }
//             }, 300)
//             .finally(() => {
//                 ev.target.reset();
//             });
//     })
// )



// VARIANT 2


// const searchInputEl = ev => {
//     const serachQuery = ev.target.value.toLowerCase().trim();
//     // ev.preventDefault();

//     console.log(serachQuery);
// };

// inputEl.addEventListener('input', _.debounce(searchInput, 300));


// fetchCountries(countryName)
//     .then(data => {
//         console.log(data);

//         if (data.length > 10) {
//             Notiflix.Notify.info(
//                 'Too many matches found. Please enter a more specific name.'
//             );
//         }

//         of(data.length > 1 && data.length <= 10){
//             console.log('making country list');
//         }

//         if (data.length === 1) {
//             console.log('making country card');
//         }
//     })

//     .catch(err => {
//         console.log(err);
//         Notiflix.Notify.failure('Oops, there is no country with that name${err}')
//     });


















// const searchInput = ev => {
//     ev.preventDefault();

//     console.log('Hello');
// }

// inputEl.addEventListener('input', searchInput);

// fetch(
//     'https://restcountries.com/v2/name/{name}'
// )
//     .then(response => {
//     if (!response.ok) {
//         throw new Error(response.status);
//     }

//     return response.json();
//     })
//     .then(data => {
//         console.log(data); 
//     })
//     .catch(err => {
//         console.log(err);
//     })
