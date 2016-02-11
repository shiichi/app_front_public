import React, { Component } from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

import Icon from 'react-fa';
//Config
import { _ADMIN_DOMAIN_NAME } from '../../../config/env';

class SidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handlePullBown() {
    this.setState({open: !this.state.open})
  }

  render() {
    return (
      <ul className="sidebar-menu">
        <li className="header">General</li>
        <LinkContainer to={{ pathname: `${_ADMIN_DOMAIN_NAME}dashboard` }}>
          <MenuItem eventKey="3" className="link pin"><Icon name="calendar" /> Dashboard</MenuItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: `${_ADMIN_DOMAIN_NAME}access/users` }}>
          <MenuItem eventKey="3" className="link pin"><Icon name="calendar" /> Access Management</MenuItem>
        </LinkContainer>
        <li className="treeview">
          <a onClick={this.handlePullBown.bind(this)}>
            <i className="fa fa-pie-chart"/>
            <span> Flight Management</span>
            <i className="fa fa-angle-left pull-right"/>
          </a>
          <ul
            className={`treeview-menu ${this.state.open ? 'menu-open' : ''}`}
            style={{display: this.state.open ? 'block' : 'none'}}>
            <LinkContainer to={{ pathname: `${_ADMIN_DOMAIN_NAME}flight` }}>
              <MenuItem eventKey="1">flight</MenuItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: `${_ADMIN_DOMAIN_NAME}flight/test` }}>
              <MenuItem eventKey="2">flight test</MenuItem>
            </LinkContainer>
          </ul>
        </li>
        <LinkContainer to={{ pathname: `${_ADMIN_DOMAIN_NAME}pins` }}>
          <MenuItem eventKey="3" className="link pin"><Icon name="calendar" />All User</MenuItem>
        </LinkContainer>
      </ul>
    );
  }
}

SidebarMenu.propTypes = {

};

export default SidebarMenu;
