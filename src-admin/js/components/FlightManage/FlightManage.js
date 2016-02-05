import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class FlightManage extends Component {
  render() {
    return (
      <div className="content-wrapper" style={{ minHeight: '916px' }}>
        <section className="content-header">
          <h1>Flight Management</h1>
        </section>
        <section className="content">
          {this.props.children}
        </section>
      </div>
    );
  }
}

FlightManage.propTypes = {
  routing: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

export default connect(mapStateToProps)(FlightManage);
