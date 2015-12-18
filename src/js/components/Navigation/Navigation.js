import React, { Component } from 'react';
import { Link } from 'react-router';
import NavHeader from './NavHeader';
import Icon from 'react-fa';

class Navigation extends Component {
  render() {
    return (
      <div className="side-bar">
          <NavHeader />
          <div className="side-bar-menu">
              <ul className="nav nav-pills nav-stacked">
                <li><Link to="/reserved" activeClassName="active" ><Icon name="calendar" /> 予約リスト</Link></li>
                <li><Link to="/reserve" activeClassName="active" ><Icon name="map-pin" /> ドローン予約</Link></li>
                <li><Link to="/ticket" activeClassName="active" ><Icon name="ticket" /> チケット購入</Link></li>
                <li><Link to="/log" activeClassName="active" ><Icon name="list" /> イベントログ</Link></li>
                <li><Link to="/profile" activeClassName="active" ><Icon name="user" /> ユーザー設定</Link></li>
              </ul>
          </div>
      </div>
    );
  }
}

export default Navigation;
