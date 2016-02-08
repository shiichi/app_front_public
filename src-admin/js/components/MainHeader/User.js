import React, { Component } from 'react';
import FlatButton from 'material-ui/lib/flat-button';

class User extends Component {
  handleLogout() {
    window.location.href = '/logout'
  }

  render() {
    return (
      <FlatButton label="Default" onClick={this.handleLogout.bind(this)}/>
    );
  }
}

User.propTypes = {

};

export default User;
