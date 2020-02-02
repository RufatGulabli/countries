import * as actions from "../actions/actionTypes";

export const addCountry = data => {
  return {
    type: actions.ADD_COUNTRY,
    newCountry: data
  };
};

export const findCountry = alphaCode => {
  return {
    type: actions.FIND_COUNTRY_SAGA,
    alphaCode
  };
};

export const initCountries = () => {
  return {
    type: actions.INIT_COUNTRIES_SAGA
  };
};

export const initStateCountries = countries => {
  return {
    type: actions.INIT_COUNTRIES,
    countries
  };
};

export const noCountryFound = msg => {
  return {
    type: actions.NO_COUNTRY_FOUND,
    msg
  };
};
