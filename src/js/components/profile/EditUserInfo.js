import React, { PropTypes, Component } from 'react';

class EditUserInfo extends Component {
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    //const { ticketPanel } = this.props;
    //const { setTicket, initTicket } = this.props.actions;

    return (
      <form method="POST" className="form-horizontal">
        <div className="form-group">
          <label className="col-md-4 control-label">Name</label>
          <div className="col-md-6">
            <input className="form-control" name="name" type="text" value="Default User" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-6 col-md-offset-4">
            <input className="btn btn-primary" type="submit" value="Save" />
          </div>
        </div>
      </form>
    );
  }
}

EditUserInfo.propTypes = {
  ticketPanel: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

export default EditUserInfo;
