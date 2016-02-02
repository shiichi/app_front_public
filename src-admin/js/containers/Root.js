import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, Redirect, IndexRoute, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import DiffMonitor from 'redux-devtools-diff-monitor';
import { IntlProvider } from 'react-intl';
//Config
import { _ADMIN_DOMAIN_NAME } from '../../config/env';
import * as i18n from '../../i18n';
//Components
import App from './App';
import Dashboard from '../components/Dashboard/Dashboard';
import AccessManage from '../components/AccessManage/AccessManage';
import Users from '../components/AccessManage/User/Users';
import CreateUser from '../components/AccessManage/User/CreateUser';
import EditUser from '../components/AccessManage/User/EditUser';
import ChangePassword from '../components/AccessManage/User/ChangePassword';
import Roles from '../components/AccessManage/Role/Roles';
import CreateRoles from '../components/AccessManage/Role/CreateRoles';
import EditRoles from '../components/AccessManage/Role/EditRoles';
import Permissions from '../components/AccessManage/Permission/Permissions';

export default class Root extends Component {
  render() {
    const { locale } = this.props;
    return (
      <div>
        <IntlProvider key='intl' locale={locale} messages={i18n[locale]}>
          <Router history={browserHistory}>
            <Route path={_ADMIN_DOMAIN_NAME} component={App}>
              <Route path="dashboard" component={Dashboard}/>
              <Route path="access" component={AccessManage}>
                <Route path="users" component={Users}/>
                <Route path="users/create" component={CreateUser}/>
                <Route path="users/:id/edit" component={EditUser}/>
                <Route path="users/:id/password/change" component={ChangePassword}/>
                <Route path="roles" component={Roles}/>
                <Route path="roles/create" component={CreateRoles}/>
                <Route path="roles/:id/edit" component={EditRoles}/>
                <Route path="permissions" component={Permissions}/>
              </Route>
            </Route>
          </Router>
        </IntlProvider>
        {/*<DevTools store={store} monitor={DiffMonitor} shortcut='ctrl+d'/>*/}
      </div>
    )
  }
}

Root.propTypes = {
  locale: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    locale: state.application.locale
  };
}

export default connect( mapStateToProps )(Root);
