import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class AccessManage extends Component {
  render() {
    return (
      <div className="content-wrapper" style={{ minHeight: '916px' }}>
        <section className="content-header">
          <h1>Access Management</h1>
        </section>
        <section className="content">
          {this.props.children}
        </section>
      </div>
    );
  }
}

AccessManage.propTypes = {
  children: PropTypes.element.isRequired,
  routing: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

export default connect(mapStateToProps)(AccessManage);
