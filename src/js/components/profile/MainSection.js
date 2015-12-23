import React, { PropTypes, Component } from 'react';
import { Table } from 'react-bootstrap';
//components
import LoginInfo from './LoginInfo';
import UserProf from './UserProf';
import EditUserInfo from './EditUserInfo';
import ChangePass from './ChangePass';

class MainSection extends Component {
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { user } = this.props;

    return (
      <div className="content-boody">
        <div className="row">
          <h4>ログイン情報</h4>
          <div className="wrap-white">
            <LoginInfo/>
          </div>
        </div>
        <div className="row">
          <h4>プロフィール</h4>
          <div className="wrap-white">
            <UserProf user={user}/>
          </div>
        </div>
        <EditUserInfo/>
        <ChangePass/>
      </div>
    );
  }
}

MainSection.propTypes = {
  ticketPanel: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
