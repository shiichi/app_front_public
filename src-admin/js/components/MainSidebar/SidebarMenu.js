import React, { Component } from 'react';
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
          <Link to={`${_ADMIN_DOMAIN_NAME}dashboard`} activeClassName="active" ><Icon name="calendar" /> Dashboard</Link>
        </li>
        <li className="link reserved">
          <Link to={`${_ADMIN_DOMAIN_NAME}access/users`} activeClassName="active" ><Icon name="calendar" /> Access Management</Link>
        </li>
        <li className="link flight">
          <Link to={`${_ADMIN_DOMAIN_NAME}flight`} activeClassName="active" ><Icon name="calendar" /> Flight Management</Link>
        </li>
        <li className="link pin">
          <Link to={`${_ADMIN_DOMAIN_NAME}pins`} activeClassName="active" ><Icon name="calendar" /> PinCode Management</Link>
        </li>
      </ul>
    );
  }
}

SidebarMenu.propTypes = {

};

export default SidebarMenu;
