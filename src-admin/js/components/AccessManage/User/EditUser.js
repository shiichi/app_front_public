import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input } from 'react-bootstrap';
//actions
import * as AccessUserActions from '../../../actions/access/user';
//components
import Options from './Options';
import AssociatedRoles from './AssociatedRoles';
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
          <Options/>
          <AssociatedRoles/>
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
