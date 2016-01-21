import React, { PropTypes, Component } from 'react';
//components

class Roles extends Component {
  render() {
    return (
      <div className="box-body">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Role</th>
                <th>Permissions</th>
                <th>Number of Users</th>
                <th>Sort</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Administrator</td>
                <td>
                  <span className="label label-success">All</span>
                </td>
                <td>1</td>
                <td>1</td>
                <td><a href="http://l.com/admin/access/roles/1/edit" className="btn btn-xs btn-primary"><i className="fa fa-pencil" data-toggle="tooltip" data-placement="top" title data-original-title="Edit" /></a> </td>
              </tr>
              <tr>
                <td>User</td>
                <td>
                  <span className="label label-danger">None</span>
                </td>
                <td>3</td>
                <td>2</td>
                <td>
                  <a href="http://l.com/admin/access/roles/2/edit" className="btn btn-xs btn-primary">
                    <i className="fa fa-pencil" data-toggle="tooltip" data-placement="top" title data-original-title="Edit" />
                  </a>
                  <a className="btn btn-xs btn-danger" data-method="delete" style={{cursor: 'pointer'}} onclick="">
                    <i className="fa fa-times" data-toggle="tooltip" data-placement="top" title data-original-title="Delete" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pull-left">
          2 role total
        </div>
        <div className="pull-right">
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

Roles.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Roles;
