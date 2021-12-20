import { combineReducers, applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reportsReducer from './reports/reports';

const reducer = combineReducers({
  reports: reportsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
