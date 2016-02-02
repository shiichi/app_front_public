import React, { PropTypes, Component } from 'react';
//Components
import International from './International';
import Message from './Message';
import Notification from './Notification';
import Task from './Task';
import User from './User';

class MainHeader extends Component {
  render() {
    const { locale, changeLocale, hundleSidebar } = this.props;
    return (
      <header className="main-header">
        <a href="index2.html" className="logo">
          <span className="logo-mini"><b>A</b>LT</span>
          <span className="logo-lg"><b>Admin</b>LTE</span>
        </a>
        <nav className="navbar navbar-static-top" role="navigation">
          <div className="sidebar-toggle" data-toggle="offcanvas" role="button" onClick={hundleSidebar}>
            <span className="sr-only">Toggle navigation</span>
          </div>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <Message/>
              <Notification/>
              <Task/>
              <User/>
              <International locale={locale} changeLocale={changeLocale}/>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

MainHeader.propTypes = {
  locale: PropTypes.string.isRequired,
  changeLocale: PropTypes.func.isRequired,
  hundleSidebar: PropTypes.func.isRequired
};

export default MainHeader;
