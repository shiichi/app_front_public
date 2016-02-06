import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
//Material-UI-components
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';

//Actions
import { routeActions } from 'react-router-redux';
import * as PinActions from '../../actions/pin/pin';

class ReactAbsolute extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {

const divStyle = {
  height: 100,
  width: '95%',
  backgroundColor: 'black',
  opacity:'.5',
}

const style = {
  height: 200,
  width: '95%',
  margin: 'auto',
  textAlign: 'center',
  display: 'inline-block',
};
    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Absolute test</h3>
        </div>
        <div className="box-body">
        <div style={divStyle}>
          <FlatButton label="Default" />
        </div>
          <Paper style={style} zDepth={1}/>
          
          <RaisedButton label="Default" />
          <Checkbox
            id="checkboxId1"
            name="checkboxName1"
            value="checkboxValue1"
            label="went for a run today"
            style={{
              width: '50%',
              margin: '0 auto'
            }}
            iconStyle={{
              fill: '#FF4081'
            }}/>
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
