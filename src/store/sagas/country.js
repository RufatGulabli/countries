import { put } from "redux-saga/effects";
import axios from "axios";
import myAxios from "../../axios";
import {
  addCountry,
  initStateCountries,
  noCountryFound
} from "../actions/index";

export function* addCountrySAGA(action) {
  try {
    const countryURL = `https://restcountries.eu/rest/v2/alpha/${action.alphaCode}`;
    const countryResp = yield axios.get(countryURL);
    const newCountry = {
      name: countryResp.data.name,
      capital: countryResp.data.capital,
      flag: countryResp.data.flag,
      currency: countryResp.data.currencies[0],
      region: countryResp.data.region,
      population: countryResp.data.population,
      borders: countryResp.data.borders,
      alpha2Code: countryResp.data.alpha2Code,
      alpha3Code: countryResp.data.alpha3Code
    };
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${newCountry.capital}&appid=16596fe956171a7376f2ba91213e3499`;
    const resp2 = yield axios.get(weatherURL);
    newCountry.temp = resp2.data.main.temp;
    yield myAxios.post("/countries.json", newCountry);
    yield put(addCountry(newCountry));
  } catch (err) {
    yield put(noCountryFound(err.response.data.message));
  }
}

export function* initCountries(action) {
  try {
    const resp = yield myAxios.get("/countries.json");
    const countries = [];
    for (let key in resp.data) {
      countries.push({
        id: key,
        ...resp.data[key]
      });
    }
    yield put(initStateCountries(countries));
  } catch (err) {
    console.log(err);
  }
}
