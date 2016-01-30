import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Icon from 'react-fa';
//Utility
import { hasPermission } from '../../../utils/PermissionUtils';

class RolesTableBody extends Component {
  handleClick(e) {
    const { id, action } = e
    const { asyncStatus, actions: {deleteRole} } = this.props;

    if (!asyncStatus[id]) {
      switch (action){
        case 'delete':
          deleteRole(id);
          break;
        default:
          break;
      }
    };
  }

  renderRoles(){
    const { myId, myRoles, myPermissions, roles, asyncStatus } = this.props;

    return roles.map(r =>
      <tr key={r.id} className="tr-disabled-aaa">
        <td>{r.name}</td>
        <td></td>
        <td></td>
        <td>{r.sort}</td>
        <td>
          {hasPermission(myRoles, myPermissions, 'edit-roles')  &&
          <LinkContainer to={{ pathname: '/access/roles/edit/' + r.id}}>
            <OverlayTrigger placement="top" overlay={(<Tooltip>Edit</Tooltip>)}>
              <Button bsStyle="primary" bsSize="xsmall"><Icon name="pencil"/></Button>
            </OverlayTrigger>
          </LinkContainer>}
          {hasPermission(myRoles, myPermissions, 'delete-roles') &&
          <OverlayTrigger placement="top" overlay={(<Tooltip>Delete</Tooltip>)}>
            <Button bsStyle="danger" bsSize="xsmall" onClick={this.handleClick.bind(this, {id: r.id, action: 'delete'})}>
              {asyncStatus[r.id] === 'delete' ? <Icon spin name="trash"/> : <Icon name="trash"/>}
            </Button>
          </OverlayTrigger>}
        </td>
      </tr>
    );
  }

  render() {
    return (
      <tbody>
        {this.renderRoles()}
      </tbody>
    );
  }
}

RolesTableBody.propTypes = {
  myId: PropTypes.number.isRequired,
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  asyncStatus: PropTypes.object,
  actions: PropTypes.object.isRequired
};

export default RolesTableBody;
