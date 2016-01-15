import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
//components
import LoginInfo from './LoginInfo';
import UserProf from './UserProf';

class MainSection extends Component {

  handleClick(e) {
    browserHistory.push('/log');
  }

  render() {
    const { user, actions: {UpdateUserProf, postChangePassword} } = this.props;

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
            <UserProf user={user} UpdateUserProf={UpdateUserProf}/>
          </div>
        </div>}
        <div>
          <button type="button" className="btn btn-default">
            <a href="/auth/deactive">アカウントを停止</a>
          </button>
          <button type="button" className="btn btn-default">
            <a href="/auth/destroy">アカウントを削除</a>
          </button>
          <button type="button" className="btn btn-default" onClick={this.handleClick.bind(this)}>
            リダイレクト
          </button>
        </div>
      </div>
    );
  }
}

MainSection.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
