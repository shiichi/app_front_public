import React, { PropTypes, Component } from 'react';
//components
import Message from './Message';
import Notification from './Notification';
import Task from './Task';
import User from './User';

class NavbarMenu extends Component {
  render() {
    return (
      <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
          <Message/>
          <Notification/>
          <Task/>
          <User/>
          <li>
            <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    );
  }
}

NavbarMenu.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default NavbarMenu;
