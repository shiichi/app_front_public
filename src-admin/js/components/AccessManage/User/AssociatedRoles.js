import React, { PropTypes, Component } from 'react';
import { Input } from 'react-bootstrap';
//components

class AssociatedRoles extends Component {
  render() {
    return (
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
    );
  }
}

AssociatedRoles.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default AssociatedRoles;






