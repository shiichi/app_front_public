import React, { PropTypes, Component } from 'react';
import { Input } from 'react-bootstrap';
//components
import AssociatedPermissions from './AssociatedPermissions';

class CreateRoles extends Component {
  render() {
    return (
      <div className="box-body">
        <form className="form-horizontal">
          <Input type="text" label="Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
          <AssociatedPermissions/>
          <Input type="text" label="Sort" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
        </form>
      </div>
    );
  }
}

CreateRoles.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default CreateRoles;
