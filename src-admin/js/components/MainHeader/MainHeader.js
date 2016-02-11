import React, { PropTypes, Component } from 'react';
//Components
import International from './International';
import Message from './Message';
import Notification from './Notification';
import Task from './Task';
import User from './User';

import mui from 'material-ui';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClick(event, key) {
    const { changeLocale } = this.props;
    changeLocale(key);
  }

  render() {
    const { locale, changeLocale, hundleSidebar } = this.props;
    return (
      <header className="main-header">
        <a className="logo">
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
