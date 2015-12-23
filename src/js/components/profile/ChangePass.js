import React, { PropTypes, Component } from 'react';

class ChangePass extends Component {
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    //const { ticketPanel } = this.props;
    //const { setTicket, initTicket } = this.props.actions;

    return (
      <form method="POST" action="http://l.com/auth/password/change" accept-charset="UTF-8" class="form-horizontal">
        <div class="form-group">
          <label class="col-md-4 control-label">現在のパスワード</label>
          <div class="col-md-6">
            <input class="form-control" name="old_password" type="password" />
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-4 control-label">新しいパスワード</label>
          <div class="col-md-6">
            <input class="form-control" name="password" type="password" />
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-4 control-label">新しいパスワード（確認）</label>
          <div class="col-md-6">
            <input class="form-control" name="password_confirmation" type="password" />
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-6 col-md-offset-4">
            <input class="btn btn-primary" type="submit" value="Change Password" />
          </div>
        </div>
      </form>
    );
  }
}

ChangePass.propTypes = {
  ticketPanel: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

export default ChangePass;
