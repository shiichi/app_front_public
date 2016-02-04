import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//Config
import { _ADMIN_DOMAIN_NAME } from '../../../config/env';

class PinCodeManage extends Component {
  render() {
    return (
      <div className="content-wrapper" style={{ minHeight: '916px' }}>
        <section className="content-header">
          <h1>Pin-Code Management</h1>
        </section>
        <section className="content">
          {this.props.children}
        </section>
      </div>
    );
  }
}

PinCodeManage.propTypes = {
  routing: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

export default connect( mapStateToProps )(PinCodeManage);
