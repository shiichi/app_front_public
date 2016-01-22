import React, { PropTypes, Component } from 'react';
import { trans } from '../../../utils/TransUtils';
//components

class OtherPermissions extends Component {
  render() {
    return (
      <div className="form-group" style={{marginTop: "30px"}}>
        <label className="col-xs-2 control-label">Other Permissions</label>
        <div className="col-xs-10">
          <div className="alert alert-info">
            <i className="fa fa-info-circle" />
            {trans('en','alert.access.users.permissionCheck')}
          </div>

          <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="form-group">
              <div className="checkbox">
                <label className>
                  <input type="checkbox" className/>
                  Resend Confirmation E-mail<small> (D)</small>
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox">
                <label className>
                  <input type="checkbox" className/>
                  Resend Confirmation E-mail<small> (D)</small>
                </label>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="form-group">
              <div className="checkbox">
                <label className>
                  <input type="checkbox" className/>
                  Resend Confirmation E-mail<small> (D)</small>
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox">
                <label className>
                  <input type="checkbox" className/>
                  Resend Confirmation E-mail<small> (D)</small>
                </label>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="form-group">
              <div className="checkbox">
                <label className>
                  <input type="checkbox" className/>
                  Resend Confirmation E-mail<small> (D)</small>
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="checkbox">
                <label className>
                  <input type="checkbox" className/>
                  Resend Confirmation E-mail<small> (D)</small>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

OtherPermissions.propTypes = {

};

export default OtherPermissions;
