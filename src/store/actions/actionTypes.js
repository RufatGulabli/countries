/* AUTHENTICATION ACTION TYPES*/
export const LOGIN = "LOGIN";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER = "REGISTER";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGOUT = "LOGOUT";
export const CHANGE_TEMP = "CHANGE_TEMP";

/* COUNTRY ACTION TYPES */
export const ADD_COUNTRY = "ADD_COUNTRY";
export const INIT_COUNTRIES = "INIT_COUNTRIES";
export const NO_COUNTRY_FOUND = "NO_COUNTRY_FOUND";

/* SAGAS */
export const LOGIN_SAGA = "LOGIN_SAGA";
export const REGISTER_SAGA = "REGISTER_SAGA";
export const CHECK_LOCAL_STORAGE = "CHECK_LOCAL_STORAGE";
export const FIND_COUNTRY_SAGA = "FIND_COUNTRY_SAGA";
export const INIT_COUNTRIES_SAGA = "INIT_COUNTRIES_SAGA";
export const LOGOUT_SAGA = "LOGOUT_SAGA";