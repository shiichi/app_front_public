import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';

class BoxHeader extends Component {
  render() {
    return (
      <div className="box-header with-border">
        <h3 className="box-title">Active Users</h3>
        <div className="box-tools pull-right">
          <div className="pull-right" style={{marginBottom: 10}}>
            <ButtonGroup>
              <DropdownButton bsStyle="primary" bsSize="small" title="Users">
                <MenuItem eventKey="1">
                  <Link to="/access/users" activeClassName="active" >All User</Link>
                </MenuItem>
                <MenuItem eventKey="2">
                  <Link to="/access/users/active" activeClassName="active" >Active User</Link>
                </MenuItem>
                <MenuItem eventKey="3">
                  <Link to="/access/users/deactivated" activeClassName="active" >Deactivated User</Link>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4">
                  <Link to="/access/user/create" activeClassName="active" >Create User</Link>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="5">
                  <Link to="/access/users/deleted" activeClassName="active" >Deleted Users</Link>
                </MenuItem>
              </DropdownButton>
              <DropdownButton bsStyle="primary" bsSize="small" title="Roles">
                <MenuItem eventKey="1">
                  <Link to="/access/roles" activeClassName="active" >All Roles</Link>
                </MenuItem>
                <MenuItem eventKey="1">
                  <Link to="/access/roles/create" activeClassName="active" >Create Role</Link>
                </MenuItem>
              </DropdownButton>
              <DropdownButton bsStyle="primary" bsSize="small" title="Permissions">
                <MenuItem eventKey="1">
                  <Link to="/access/permissions" activeClassName="active" >All Groups</Link>
                </MenuItem>
                <MenuItem eventKey="1">
                  <Link to="/access/permissions" activeClassName="active" >All Permissions</Link>
                </MenuItem>
                <MenuItem eventKey="1">
                  <Link to="/access/permissions" activeClassName="active" >Create Group</Link>
                </MenuItem>
                <MenuItem eventKey="1">
                  <Link to="/access/permissions" activeClassName="active" >Create Permission</Link>
                </MenuItem>
              </DropdownButton>
            </ButtonGroup>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

export default BoxHeader;
