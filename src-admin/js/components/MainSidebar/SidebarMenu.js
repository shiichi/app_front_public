import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Icon from 'react-fa';
//Config
import { _ADMIN_DOMAIN_NAME } from '../../../config/env';

class SidebarMenu extends Component {
  render() {
    return (
      <ul className="sidebar-menu">
        <li className="header">General</li>
        <li className="link dashboard">
          <Link to={_ADMIN_DOMAIN_NAME + 'dashboard'} activeClassName="active" ><Icon name="calendar" /> Dashboard</Link>
        </li>
        <li className="link reserved">
          <Link to={_ADMIN_DOMAIN_NAME + 'access/users'} activeClassName="active" ><Icon name="calendar" /> Access Management</Link>
        </li>
        <li className="link flight">
          <Link to={_ADMIN_DOMAIN_NAME + 'flight'} activeClassName="active" ><Icon name="calendar" /> Flight Management</Link>
        </li>
        <li className="link pin">
          <Link to={_ADMIN_DOMAIN_NAME + 'pins'} activeClassName="active" ><Icon name="calendar" /> PinCode Management</Link>
        </li>
        <li className=" treeview">
          <a href="#">
            <span>Log Viewer</span>
            <i className="fa fa-angle-left pull-right" />
          </a>
          <ul className="treeview-menu " style={{display: 'none'}}>
            <li className>
              <a href="http://l.com/admin/log-viewer">Dashboard</a>
            </li>
            <li className>
              <a href="http://l.com/admin/log-viewer/logs">Logs</a>
            </li>
          </ul>
        </li>
      </ul>
    );
  }
}

SidebarMenu.propTypes = {

};

export default SidebarMenu;
