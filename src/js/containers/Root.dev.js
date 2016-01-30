import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Link, Redirect, IndexRoute } from 'react-router'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import DiffMonitor from 'redux-devtools-diff-monitor'
import configureStore from '../store/configureStore'

// Components
import App from './App'
import MainHeader from '../components/MainHeader'
import Navigation from '../components/Navigation/Navigation'
import { Reserved, Reserve, Ticket, Log, Profile } from "./routes"

const rootRoute = {
  component: "div",
  childRoutes: [{
    path: "/",
    component: App,
    indexRoute: Reserved,
    childRoutes: [
      Reserved, Reserve, Ticket, Log, Profile
    ]
  }]
};

const store = configureStore();

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    const { history } = this.props;

    return (
      <div>
        <MainHeader/>
        <Provider store={store}>
          <Router history={history} routes={rootRoute} />
        </Provider>
        {/* <DevTools store={store} monitor={DiffMonitor} shortcut='ctrl+d'/> */}
      </div>
    )
  }
}
