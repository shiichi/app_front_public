import React, { PropTypes, Component } from 'react';
import Icon from 'react-fa';
//Components

class Loading extends Component {
  render() {
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
