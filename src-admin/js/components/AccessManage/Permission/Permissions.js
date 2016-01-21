import React, { PropTypes, Component } from 'react';
//components

class Permissions extends Component {
  render() {
    return (
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Permission</th>
            <th>Name</th>
            <th>Dependencies</th>
            <th>Users</th>
            <th>Roles</th>
            <th>Group</th>
            <th>Group Sort</th>
            <th>System</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>change-user-password</td>
            <td>Change User Password</td>
            <td>
              View Backend<br />
              View Access Management<br />
            </td>
            <td>
              <span className="label label-danger">None</span>
            </td>
            <td>
              Administrator<br />
            </td>
            <td>
              User
            </td>
            <td>8</td>
            <td><span className="label label-danger">Yes</span></td>
            <td>
              <a href="http://l.com/admin/access/roles/permissions/6/edit" className="btn btn-xs btn-primary"><i className="fa fa-pencil" data-toggle="tooltip" data-placement="top" title data-original-title="Edit" /></a>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

Permissions.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Permissions;
