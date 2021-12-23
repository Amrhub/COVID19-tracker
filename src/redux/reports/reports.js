import _ from 'lodash';
import formatCountries, { countriesList } from '../../logic/getCountries';

// CONST TYPES
const FETCH_SUCCEED = 'COVID19TRACKER/REPORTS/FETCH_SUCCEED';
const FETCH_FAILED = 'COVID19TRACKER/REPORTS/FETCH_FAILED';
const FETCHING = 'COVID19TRACKER/REPORTS/FETCHING';
const API_URL = 'https://api.covid19tracking.narrativa.com//api/';

// initial state
const initialState = { isFetching: true };

// Action Creators

export const fetchReports = (date = '2021-12-21') => async (dispatch) => {
  try {
    dispatch({ type: FETCHING, payload: true });
    const response = await fetch(API_URL + date);
    const data = await response.json();

    data.total.imagePath = '/src/assets/world.svg';
    const countries = formatCountries(data);
    const countriesArr = _.map(countries, (country) => country);
    const payload = {
      countries,
      countriesList: countriesList(countries),
      countriesArr,
      globalReport: data.total,
      isFetching: false,
    };
    dispatch({ type: FETCH_SUCCEED, payload });
  } catch {
    dispatch({ type: FETCH_FAILED });
  }
};

// reducer
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING:
      return { ...state, isFetching: payload };
    case FETCH_SUCCEED:
      return { ...state, ...payload };
    case FETCH_FAILED:
      return { state, isFetching: false };
    default:
      return state;
  }
};

export default reducer;
