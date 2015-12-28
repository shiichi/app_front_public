import React, { PropTypes, Component } from 'react';
//components
import LoginInfo from './LoginInfo';
import UserProf from './UserProf';

class MainSection extends Component {
  render() {
    const { user, actions: {fetchUpdateUserProf, postChangePassword} } = this.props;

    return (
      <div className="content-boody">
        <div className="row">
          <h4>ログイン情報</h4>
          <div className="wrap-white">
            <LoginInfo user={user} postChangePassword={postChangePassword}/>
          </div>
        </div>
        {!user.isFetching &&
        <div className="row">
          <h4>プロフィール</h4>
          {user.didInvalidate && <p>ユーザー情報の更新に失敗しました</p>}
          <div className="wrap-white">
            <UserProf user={user} fetchUpdateUserProf={fetchUpdateUserProf}/>
          </div>
        </div>}
      </div>
    );
  }
}

MainSection.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
