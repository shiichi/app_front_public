import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import promiseMiddleware from '../middleware/promiseMiddleware';
import * as reducers from '../reducers';

//reducers/index.jsから全てのreducerを取得してcombine
const rootReducer = combineReducers(reducers);

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, promiseMiddleware, promise)
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState, thunk, promise);
  return store;
}
