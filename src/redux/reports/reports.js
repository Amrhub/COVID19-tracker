import filterCountries from '../../logic/getCountries';

// CONST TYPES
const FETCH_SUCCEED = 'COVID19TRACKER/REPORTS/FETCH_SUCCEED';
const FETCH_FAILED = 'COVID19TRACKER/REPORTS/FETCH_FAILED';
const API_URL = 'https://api.covid19tracking.narrativa.com//api/';

// initial state
const initialState = [];

// Action Creators

export const fetchReports = (date = '2021-12-21') => async (dispatch) => {
  try {
    const response = await fetch(API_URL + date);
    const data = await response.json();

    data.total.imagePath = '/src/assets/world.svg';
    const payload = {
      countries: filterCountries(data),
      globalReport: data.total,
    };
    dispatch({ type: FETCH_SUCCEED, payload });
  } catch {
    dispatch({ type: FETCH_FAILED });
  }
};

// reducer
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SUCCEED:
      return payload;
    case FETCH_FAILED:
      return state;
    default:
      return state;
  }
};

export default reducer;
