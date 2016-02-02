import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Link, Redirect, IndexRoute, browserHistory } from 'react-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import DiffMonitor from 'redux-devtools-diff-monitor';
import configureStore from '../store/configureStore';
// Components
import App from './App';
import MainHeader from '../components/MainHeader';
import Navigation from '../components/Navigation/Navigation';
//import { Reserved, Reserve, Ticket, Log, Profile } from "./routes"
import Reserved from '../components/Reserved/Reserved.js';
import Reserve from '../components/Reserve/Reserve.js';
import Ticket from '../components/Ticket/Ticket.js';
import Log from '../components/Log/Log.js';
import Profile from '../components/Profile/Profile.js';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <div>
        <MainHeader/>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/mypage/" component={App}>
              <Route path="reserved" component={Reserved}/>
              <Route path="reserve" component={Reserve}/>
              <Route path="ticket" component={Ticket}/>
              <Route path="log" component={Log}/>
              <Route path="profile" component={Profile}/>
            </Route>
          </Router>
        </Provider>
        {/* <DevTools store={store} monitor={DiffMonitor} shortcut='ctrl+d'/> */}
      </div>
    )
  }
}
