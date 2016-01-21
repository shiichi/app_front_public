import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
//components
import BoxHeader from '../Common/BoxHeader';

class AccessManage extends Component {
  render() {
    return (
      <div className="box box-success">
        <BoxHeader/>
        <div className="box-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

AccessManage.propTypes = {
  routing: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

export default connect( mapStateToProps )(AccessManage);
