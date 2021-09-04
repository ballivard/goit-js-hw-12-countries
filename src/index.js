import debounce from 'lodash.debounce';
import { error, info, notice } from "@pnotify/core";
import { defaults } from "@pnotify/core";
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './fetchCountries';
import countryTemplate from './templates/template.hbs';
import countryList from './templates/countryList.hbs';

const refs = {
    input: document.querySelector('#input'),
    countryList: document.querySelector('.country-list'),
}

input.addEventListener('input', debounce(searchCountry, 500));


function searchCountry() {
    clearInput();
    
    let value = refs.input.value;
    
    fetchCountries(value)
        .then(data => updateTemplate(data))
        .catch(error => console.log(error));
}

function updateTemplate(data) {
    const markup = countryTemplate(data);
    const markupList = countryList(data);

    if (!data.length) {
      error({
        text: `Please enter a more specific query!`,
      });
    
      return
    };

    if (data.length <= 10) {
        refs.countryList.insertAdjacentHTML('beforeend', markupList);
    }

    if (data.length > 10) {
      error({
        text: `Too many matches found. Please enter a more specific query!`,
      });
    }

    if (data.length === 1) {
      refs.countryList.innerHTML = "";
      refs.countryList.insertAdjacentHTML("beforeend", markup);
    }
}

function clearInput() {
    refs.countryList.innerHTML = "";
}