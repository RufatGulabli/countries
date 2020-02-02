import * as actions from "../actions/actionTypes";

const initialState = {
  countries: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_COUNTRY: {
      return {
        ...state,
        countries: state.countries.concat(action.newCountry),
        error: null
      };
    }
    case actions.INIT_COUNTRIES: {
      return {
        ...state,
        countries: [...action.countries]
      };
    }
    case actions.NO_COUNTRY_FOUND: {
      console.log("Reducer", action.msg);
      return {
        ...state,
        error: action.msg
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
