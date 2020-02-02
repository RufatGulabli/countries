import React from "react";

export const CELSIUS = <small>&#8451;</small>;
export const FAHRENHEIT = <small>&#8457;</small>;
export const KELVIN = <small>&#8490;</small>;

export const checkValidity = (rules, value) => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }
  if (rules.isMail) {
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.onlyLetters) {
    const pattern = /^[A-Za-z]+$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};

export const checkIfFormIsValid = state => {
  let found = true;
  for (let key in state) {
    if (!state[key].isValid) {
      found = false;
    }
  }
  return found;
};

export const Temperature = {
  CELSIUS: 0,
  FAHRENHEIT: 1,
  KELVIN: 2
};

export const convertKelVinToCelsius = degree => {
  return +degree - 273.15;
};

export const convertKelvinToFahrenheit = degree => {
  return ((degree - 273.15) * 9) / 5 + 32;
};
