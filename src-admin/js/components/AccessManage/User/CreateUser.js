import React, { PropTypes, Component } from 'react';
import { Input } from 'react-bootstrap';
//components
import Options from './Options';
import AssociatedRoles from './AssociatedRoles';
import OtherPermissions from './OtherPermissions';

class CreateUser extends Component {
  render() {
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

CreateUser.propTypes = {

};

export default CreateUser;






