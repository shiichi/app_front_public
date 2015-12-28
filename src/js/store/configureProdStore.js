import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import promiseMiddleware from '../middleware/promiseMiddleware';
import {reducer as formReducer} from 'redux-form';
import * as reducers from '../reducers';

//reducers/index.jsから全てのreducerを取得,formReducerとそれらをcombine
const allReducers = {
  ...reducers,
  form: formReducer
};
const rootReducer = combineReducers(allReducers);

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, promiseMiddleware, promise)
)(createStore);

export default function configureProdStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState, thunk, promise);
  return store;
}
