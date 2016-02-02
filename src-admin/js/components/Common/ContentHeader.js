import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Icon from 'react-fa';
//components

class ContentHeder extends Component {
  render() {
    const { routing } = this.props;
    return (
      <section className="content-header">
        <h1>
          User Management
          <small>Active Users</small>
        </h1>
        <ol className="breadcrumb">
          <li className="link dashboard">
            <Link to="/dashboard" activeClassName="active" >
            <Icon name="calendar" /> Dashboard</Link>
          </li>
          <li className="active">User Management</li>
        </ol>
      </section>
    );
  }
}

ContentHeder.propTypes = {

};

export default ContentHeder;