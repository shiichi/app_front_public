import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input } from 'react-bootstrap';
//actions
import * as AccessUserActions from '../../../actions/access/user';
//components
import OtherPermissions from './OtherPermissions';

class EditUser extends Component {


  render() {
    console.log(this.props.routeParams)
    return (
      <div className="box-body">
        <form className="form-horizontal">
          <Input type="text" label="Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
          <Input type="text" label="E-mail" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
          <Input type="password" label="Password" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
          <Input type="password" label="Password Confirmation" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />

          <div className="form-group">
            <label className="col-xs-2 control-label">Options</label>
            <div className="col-xs-10">
              <div className="checkbox">
                <label className>
                  <input type="checkbox" className /><span>Active</span>
                </label>
              </div>
              <span className="help-block">hoge hoge</span>
            </div>
            <div className="col-xs-offset-2 col-xs-10">
              <div className="checkbox">
                <label className>
                  <input type="checkbox" className/><span>Confirmed</span>
                </label>
              </div>
              <span className="help-block">hoge hoge</span>
            </div>
            <div className="col-xs-offset-2 col-xs-10">
              <div className="checkbox">
                <label className>
                  <input type="checkbox" className/><span>Send Confirmation Mail</span>
                </label>
              </div>
              <span className="help-block">If confirmed is off</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">Associated Roles</label>
            <div className="col-xs-10">
              <div className="checkbox">
                <label className>
                  <input type="checkbox" className /><span><strong>Administrator</strong></span>
                </label>
              </div>
            </div>
            <div className="col-xs-offset-2 col-xs-10">
              <div className="checkbox">
                <label className>
                  <input type="checkbox" className/><span><strong>User</strong></span>
                </label>
              </div>
            </div>
          </div>          
          <OtherPermissions/>
        </form>
      </div>
    );
  }
}

EditUser.propTypes = {
  myId: PropTypes.number.isRequired,
  users: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  asyncStatus: PropTypes.array,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
    myProfile: state.myProfile,
    pageStatus: state.pageStatus,
    alert: state.alert,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccessUserActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(EditUser);
