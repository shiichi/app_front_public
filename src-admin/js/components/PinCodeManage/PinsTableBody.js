import React, { PropTypes, Component } from 'react';

class PinsTableBody extends Component {
  renderPins(){
    const { myId, myRoles, myPermissions, pins } = this.props;

    return pins.map(p =>
      <tr key={p.id} className="tr-disabled-aaa">
        <td>{p.pin}</td>
        <td>{p.numberOfTickets}</td>
        <td>{p.createdAt}<br/></td>
        <td><span className="label label-danger">Yes</span></td>
      </tr>
    );
  }

  render() {
    return (
      <tbody>
        {this.renderPins()}
      </tbody>
    );
  }
}

PinsTableBody.propTypes = {
  myId: PropTypes.number.isRequired,
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  pins: PropTypes.array.isRequired,
};

export default PinsTableBody;
