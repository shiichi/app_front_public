import React, { PropTypes, Component } from 'react';
import { Input } from 'react-bootstrap';
//components

class Options extends Component {
  render() {
    return (
      <div className="form-group">
        <label className="col-xs-2 control-label">Options</label>
        <div className="col-xs-10">
          <div className="checkbox">
            <label className>
              <input type="checkbox" className /><span>Active</span>
            </label>
          </div>
          <span className="help-block">hoge hoge</span>
        </div>
        <div className="col-xs-offset-2 col-xs-10">
          <div className="checkbox">
            <label className>
              <input type="checkbox" className/><span>Confirmed</span>
            </label>
          </div>
          <span className="help-block">hoge hoge</span>
        </div>
        <div className="col-xs-offset-2 col-xs-10">
          <div className="checkbox">
            <label className>
              <input type="checkbox" className/><span>Send Confirmation Mail</span>
            </label>
          </div>
          <span className="help-block">If confirmed is off</span>
        </div>
      </div>
    );
  }
}

Options.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Options;






