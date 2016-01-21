import React, { PropTypes, Component } from 'react';
import { Input } from 'react-bootstrap';
//Utility
import { trans } from '../../utils/TransUtils';

class Alert extends Component {
  renderAlert() {
    const { access } = this.props.alert;
    return access.map(a =>
      <div className="alert alert-success" key={a.id}>
        { trans('en', a.msg) }
      </div>
    );
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert.access && this.renderAlert()}
      </div>
    );
  }
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

export default Alert;
