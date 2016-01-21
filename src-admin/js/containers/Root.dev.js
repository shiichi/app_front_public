import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Link, Redirect, IndexRoute } from 'react-router'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import DiffMonitor from 'redux-devtools-diff-monitor'
import { syncReduxAndRouter } from 'redux-simple-router';
import { createHistory, useBasename } from 'history';
import configureStore from '../store/configureStore'
// Components
import App from './App';
import Dashboard from '../components/Dashboard/Dashboard';
import AccessManage from '../components/AccessManage/AccessManage';
import Users from '../components/AccessManage/User/Users';
import CreateUser from '../components/AccessManage/User/CreateUser';
import Roles from '../components/AccessManage/Role/Roles';
import CreateRoles from '../components/AccessManage/Role/CreateRoles';
import Permissions from '../components/AccessManage/Permission/Permissions';

const store = configureStore();
const history = useBasename(createHistory)({
  basename: '/admin/single'
});
syncReduxAndRouter(history, store);

export default class Root extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={App}>
              <Route path="dashboard" component={Dashboard}/>
              <Route path="access" component={AccessManage}>
                <Route path="users" component={Users}/>
                <Route path="users/active" component={Users}/>
                <Route path="users/deactivated" component={Users}/>
                <Route path="users/deleted" component={Users}/>
                <Route path="user/create" component={CreateUser}/>
                <Route path="user/edit:id" component={CreateUser}/>
                <Route path="roles" component={Roles}/>
                <Route path="roles/create" component={CreateRoles}/>
                <Route path="roles/edit:id" component={CreateRoles}/>
                <Route path="permissions" component={Permissions}/>
              </Route>
            </Route>
          </Router>
        </Provider>
        {/* <DevTools store={store} monitor={DiffMonitor} shortcut='ctrl+d'/> */}
      </div>
    )
  }
}
