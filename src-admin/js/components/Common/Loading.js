import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import Icon from 'react-fa';
//components

class Loading extends Component {
  render() {
    const { users } = this.props;
    return (
      <div className="center-block">
        <Icon spin name="spinner" className="text-center"/>
      </div>
    );
  }
}

Loading.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Loading;
