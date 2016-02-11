import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import { devTools, persistState as persistDevToolsState } from 'redux-devtools';
//import { persistState as persistDevToolsState } from 'redux-devtools';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';
import rootReducer from '../reducers';
//import DevTools from '../containers/DevTools';

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const logger = createLogger({
  predicate: () => process.env.NODE_ENV === `development`
});

//persistStateはdevToolsより上に記述
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, promise, logger, reduxRouterMiddleware),
  persistState(['application']),
  devTools(),
  //DevTools.instrument(),
  persistDevToolsState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState, thunk, promise, logger);
  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
