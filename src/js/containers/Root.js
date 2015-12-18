import 'babel-core/polyfill'
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link, Redirect, IndexRoute } from 'react-router'
import { ReduxRouter, routerStateReducer, reduxReactRouter } from 'redux-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import DiffMonitor from 'redux-devtools-diff-monitor'
import configureStore from '../store/configureStore'
import { App } from './'
import { MainHeader, Navigation, Reserved, Reserve, Ticket, Log, Profile, TodoApp } from '../components'

const store = configureStore()
export default class Root extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history } = this.props;

    return (
      <div>
        <MainHeader/>
        <Provider store={store}>
          <Router history={history} >
            <Route path="/" component={App} >
              <IndexRoute component={Reserved} />
              <Route path="reserved" component={Reserved} />
              <Route path="reserve" component={Reserve} />
              <Route path="ticket" component={Ticket} />
              <Route path="log" component={Log} />
              <Route path="profile" component={Profile} />
            </Route>
          </Router>
        </Provider>
{/*        <DevTools store={store} monitor={DiffMonitor} shortcut='ctrl+d'/> */}
      </div>
    )
  }
}