import 'babel-core/polyfill'
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Link, Redirect, IndexRoute } from 'react-router'
import configureProdStore from '../store/configureProdStore'

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

const store = configureProdStore();

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
      </div>
    )
  }
}
