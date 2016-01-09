import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {devTools, persistState as persistDevToolsState} from 'redux-devtools';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage'
import {reducer as formReducer} from 'redux-form';
import * as reducers from '../reducers';

const logger = createLogger({
  predicate: (getState, action) => process.env.NODE_ENV === `dev`
});

//reducers/index.jsから全てのreducerを取得,formReducerとそれらをcombine
const allReducers = {
  ...reducers,
  form: formReducer
};
const rootReducer = combineReducers(allReducers);

//persistStateはdevToolsより上に記述
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, promise, logger),
  persistState(['jwtToken']),
  devTools(),
  persistDevToolsState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
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
