import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import promiseMiddleware from '../middleware/promiseMiddleware';
import * as reducers from '../reducers';

const logger = createLogger({
  predicate: (getState, action) => process.env.NODE_ENV === `dev`
});
//reducers/index.jsから全てのreducerを取得してcombine
const rootReducer = combineReducers(reducers);

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, promiseMiddleware, promise, logger),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState, thunk, promise, logger);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

