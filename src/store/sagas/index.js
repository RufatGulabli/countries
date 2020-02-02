import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {
  loginSAGA,
  registerSAGA,
  checkLocalStorageSAGA,
  logoutSAGA
} from "./auth";
import { addCountrySAGA, initCountries } from "./country";

export function* watchLogin() {
  yield takeEvery(actionTypes.LOGIN_SAGA, loginSAGA);
  yield takeEvery(actionTypes.REGISTER_SAGA, registerSAGA);
  yield takeEvery(actionTypes.CHECK_LOCAL_STORAGE, checkLocalStorageSAGA);
  yield takeEvery(actionTypes.LOGOUT_SAGA, logoutSAGA);
}

export function* watchCountry() {
  yield takeEvery(actionTypes.FIND_COUNTRY_SAGA, addCountrySAGA);
  yield takeEvery(actionTypes.INIT_COUNTRIES_SAGA, initCountries);
}
