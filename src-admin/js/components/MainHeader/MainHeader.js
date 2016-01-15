import React, { PropTypes, Component } from 'react';
//components
import Navigation from './Navigation';

class MainHeader extends Component {
  render() {
    return (
      <header className="main-header">
        <a href="index2.html" className="logo">
          <span className="logo-mini"><b>A</b>LT</span>
          <span className="logo-lg"><b>Admin</b>LTE</span>
        </a>
        <Navigation/>
      </header>
    );
  }
}

MainHeader.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainHeader;
