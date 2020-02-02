import { put } from "redux-saga/effects";
import axios from "axios";
import jwt from "jsonwebtoken";
import myAxios from "../../axios";
import {
  registerFailed,
  registerSuccess,
  loginSucceed,
  loginFailed,
  logout
} from "../actions/index";

export function* loginSAGA(action) {
  try {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAADtXpdULDuIrQdywrW8YWsLY-ujogxGk";
    const resp = yield axios.post(url, {
      email: action.email,
      password: action.password,
      returnSecureToken: true
    });
    yield localStorage.setItem("token", resp.data.idToken);
    yield localStorage.setItem("localId", resp.data.localId);
    yield put(loginSucceed(resp.data.idToken, resp.data.localId));
    action.history.replace("/dashboard");
  } catch (err) {
    yield put(loginFailed(err.response.data.error.message));
  }
}

export function* registerSAGA(action) {
  try {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAADtXpdULDuIrQdywrW8YWsLY-ujogxGk";
    const resp = yield axios.post(url, {
      email: action.data.email,
      password: action.data.password,
      returnSecureToken: true
    });
    yield put(registerSuccess(resp.data.idToken, resp.data.localId));
    yield myAxios.post("/users.json", {
      firstname: action.data.firstname,
      lastname: action.data.lastname,
      birthdate: action.data.birthdate,
      gender: action.data.gender
    });
    yield localStorage.setItem("token", resp.data.idToken);
    yield localStorage.setItem("localId", resp.data.localId);
    action.history.replace("/dashboard");
  } catch (err) {
    yield put(registerFailed(err.response.data.error.message));
  }
}

export function* checkLocalStorageSAGA() {
  try {
    const idToken = yield localStorage.getItem("token");
    const localId = yield localStorage.getItem("localId");
    if (idToken) {
      const user = yield jwt.decode(idToken);
      if (user.user_id === localId) {
        yield put(loginSucceed(idToken, localId));
      }
    }
  } catch (err) {
    yield put(loginFailed(err.response.data.error.message));
  }
}

export function* logoutSAGA() {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("localId");
  yield put(logout());
}
