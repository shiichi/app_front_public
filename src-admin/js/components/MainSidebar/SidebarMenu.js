import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Icon from 'react-fa';
//components

class SidebarMenu extends Component {
  render() {
    return (
      <ul className="sidebar-menu">
        <li className="header">General</li>
        <li className="link dashboard">
          <Link to="/dashboard" activeClassName="active" ><Icon name="calendar" /> Dashboard</Link>
        </li>
        <li className="link reserved">
          <Link to="/access/users" activeClassName="active" ><Icon name="calendar" /> Access Management</Link>
        </li>
        <li className="link flight">
          <Link to="/flight" activeClassName="active" ><Icon name="calendar" /> Flight Management</Link>
        </li>
        <li className="link pin">
          <Link to="/pin" activeClassName="active" ><Icon name="calendar" /> PinCode Management</Link>
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
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default SidebarMenu;
