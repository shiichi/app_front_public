import React, { PropTypes, Component } from 'react';
//components
import NavbarMenu from './NavbarMenu';

class Navigation extends Component {
  render() {
    return (
        <nav className="navbar navbar-static-top" role="navigation">
          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>
          <NavbarMenu/>
        </nav>
    );
  }
}

Navigation.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Navigation;
