import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Link, Redirect, IndexRoute } from 'react-router'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import DiffMonitor from 'redux-devtools-diff-monitor'
import { syncReduxAndRouter } from 'redux-simple-router';
import { createHistory, useBasename } from 'history';
import configureStore from '../store/configureStore'
// Components
import App from './App'
import { Header, Reserved, Reserve, Ticket, Log, Profile } from "./routes"

const store = configureStore();
const history = useBasename(createHistory)({
  basename: '/admin/single'
});
syncReduxAndRouter(history, store);

const rootRoute = {
  component: "div",
  childRoutes: [{
    path: "/",
    component: App,
    indexRoute: Header,
    childRoutes: [ Header ]
  }]
};

export default class Root extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={history} routes={rootRoute} />
        </Provider>
        {/* <DevTools store={store} monitor={DiffMonitor} shortcut='ctrl+d'/> */}
      </div>
    )
  }
}
