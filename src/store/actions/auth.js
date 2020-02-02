import * as actions from "../actions/actionTypes";

export const loginStart = (email, password, history) => {
  return {
    type: actions.LOGIN_SAGA,
    email,
    password,
    history
  };
};

export const loginSucceed = (idToken, localId) => {
  return {
    type: actions.LOGIN,
    idToken,
    localId
  };
};

export const loginFailed = msg => {
  return {
    type: actions.LOGIN_FAIL,
    errorMsg: msg
  };
};

export const registerStart = (data, history) => {
  return {
    type: actions.REGISTER_SAGA,
    data,
    history
  };
};

export const registerSuccess = (idToken, localId) => {
  return {
    type: actions.REGISTER,
    idToken,
    localId
  };
};

export const registerFailed = msg => {
  return {
    type: actions.REGISTER_FAILED,
    errorMsg: msg
  };
};

export const checkLocalStorage = () => {
  return {
    type: actions.CHECK_LOCAL_STORAGE
  };
};

export const logout = () => {
  return {
    type: actions.LOGOUT
  };
};

export const logoutStart = () => {
  return {
    type: actions.LOGOUT_SAGA
  };
};

export const changeTemp = temp => {
  return {
    type: actions.CHANGE_TEMP,
    temp
  };
};
