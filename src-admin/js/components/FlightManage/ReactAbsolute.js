import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { AbsoluteGrid } from 'react-absolute-grid';
//import AbsoluteGrid from './lib/AbsoluteGrid.jsx';

//Actions
import { routeActions } from 'react-router-redux';
import * as PinActions from '../../actions/pin/pin';
//Components
//import RightMenu from './RightMenu';

class ReactAbsolute extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Absolute test</h3>
        </div>
        <div className="box-body">
        </div>
      </div>
    );
  }
}

ReactAbsolute.propTypes = {
  myId: PropTypes.number.isRequired,
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    myId: state.myProfile.id,
    myRoles: state.myProfile.assigneesRoles,
    myPermissions: state.myProfile.assigneesPermissions,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, PinActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactAbsolute);
