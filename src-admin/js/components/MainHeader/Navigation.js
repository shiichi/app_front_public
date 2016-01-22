import React, { PropTypes, Component } from 'react';
//components
import Language from './Language';
import Message from './Message';
import Notification from './Notification';
import Task from './Task';
import User from './User';

class Navigation extends Component {
  handleClick() {
    const { changeSidebar } = this.props;
    changeSidebar();
  }

  render() {
    return (
        <nav className="navbar navbar-static-top" role="navigation">
          <div className="sidebar-toggle" data-toggle="offcanvas" role="button" onClick={this.handleClick.bind(this)}>
            <span className="sr-only">Toggle navigation</span>
          </div>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <Message/>
              <Notification/>
              <Task/>
              <User/>
              <Language/>
            </ul>
          </div>
        </nav>
    );
  }
}

Navigation.propTypes = {
  changeSidebar: PropTypes.func.isRequired
};

export default Navigation;
