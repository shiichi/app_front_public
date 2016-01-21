import React, { PropTypes, Component } from 'react';
//components
import Navigation from './Navigation';

class MainHeader extends Component {
  render() {
    const { changeSidebar } = this.props;
    return (
      <header className="main-header">
        <a href="index2.html" className="logo">
          <span className="logo-mini"><b>A</b>LT</span>
          <span className="logo-lg"><b>Admin</b>LTE</span>
        </a>
        <Navigation changeSidebar={changeSidebar}/>
      </header>
    );
  }
}

MainHeader.propTypes = {
  changeSidebar: PropTypes.func.isRequired
};

export default MainHeader;
