import * as actions from "../actions/actionTypes";
import { Temperature } from "../../util/utility";

const initialState = {
  idToken: null,
  userId: null,
  loginError: null,
  registerError: null,
  defaultTemp: Temperature.CELSIUS
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN: {
      return {
        ...state,
        idToken: action.idToken,
        userId: action.localId,
        loginError: null
      };
    }
    case actions.LOGIN_FAIL: {
      return {
        ...state,
        loginError: action.errorMsg
      };
    }
    case actions.REGISTER: {
      return {
        ...state,
        idToken: action.idToken,
        userId: action.localId,
        registerError: null
      };
    }
    case actions.REGISTER_FAILED: {
      return {
        ...state,
        registerError: action.errorMsg
      };
    }
    case actions.LOGOUT: {
      return {
        ...state,
        idToken: null,
        userId: null
      };
    }
    case actions.CHANGE_TEMP: {
      return {
        ...state,
        defaultTemp: action.temp
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
