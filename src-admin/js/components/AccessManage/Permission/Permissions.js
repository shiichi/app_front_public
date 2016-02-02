import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import Icon from 'react-fa';
//Actions
import * as AccessPermissionActions from '../../../actions/access/permission';
//Components
import PermissionsTableBody from './PermissionsTableBody';

class Permissions extends Component {
  componentDidMount() {
    const { fetchPermissions } = this.props.actions;
    fetchPermissions();
  }

  render() {
    const { myId, myRoles, myPermissions, permissions, isFetching, didInvalidate } = this.props;

    return (
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Permission</th>
            <th>Name</th>
            <th>Dependencies</th>
            <th>Users</th>
            <th>Roles</th>
            <th>Group Sort</th>
            <th>System</th>
          </tr>
        </thead>
        {!didInvalidate && !isFetching && permissions && 
        <PermissionsTableBody
          myId={myId}
          myRoles={myRoles}
          myPermissions={myPermissions}
          permissions={permissions}/>}
      </table>
    );
  }
}

Permissions.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    myId: state.myProfile.id,
    myRoles: state.myProfile.assigneesRoles,
    myPermissions: state.myProfile.assigneesPermissions,
    permissions: state.permissions.permissions,
    isFetching: state.permissions.isFetching,
    didInvalidate: state.permissions.didInvalidate,
    asyncStatus: state.permissions.asyncStatus,
    path: state.routing.path
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccessPermissionActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps )(Permissions);
