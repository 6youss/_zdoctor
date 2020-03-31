import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import * as reducers from './reducers';

const middlewares: Array<any> = [];

if (__DEV__) {
  middlewares.push(logger);
}

export const store = createStore(
  combineReducers(reducers),
  applyMiddleware(...middlewares),
);
