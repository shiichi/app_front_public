import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Icon from 'react-fa';

class ContentHeder extends Component {
  render() {
    const param = this.props.routing.location.pathname.split('/');
    let title = '';
    switch(param[3]) {
      case 'dashboard': title = 'Dashboard'; break; 
      case 'access':
        switch(param[4]) {
          case 'users': title = 'User Management'; break; 
          case 'roles': title = 'Role Management'; break; 
          case 'permissions': title = 'Permission Management'; break; 
        }
    }

    return (
      <section className="content-header">
        <h1>{title}</h1>
      </section>
    );
  }
}

ContentHeder.propTypes = {

};

export default ContentHeder;