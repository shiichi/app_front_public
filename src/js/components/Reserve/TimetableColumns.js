import React, { PropTypes, Component } from 'react';
import fetch from 'isomorphic-fetch';
import { CSRFToken } from '../../utils/csrfUtils';

class TimetableColmuns extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const request = {id: e.target[0].value};
    this.props.validateReservation(request);
  }

  renderClose() {
    return (
      <div className="rsv rsv-close" ><p>ー</p></div>
    );
  }

  renderReserved() {
    return (
      <div className="rsv rsv-reserved" ><p>予約済み</p></div>
    );
  }

  renderMyReservation() {
    return (
      <div className="rsv rsv-myreservation" ><p>自分の予約</p></div>
    );
  }

  renderOpen(id, time) {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="hidden" name="id" value={ id } />
        <input type="submit" value={ time } className="rsv rsv-open" />
      </form>
    );
  }

  render() {
    const { columns } = this.props;
    const renderTimetableNodes = [];

    for (let i of columns) {
      switch (i.c) {
      case '0':
        renderTimetableNodes.push( this.renderClose(i.t) );
        break;
      case '1':
        renderTimetableNodes.push( this.renderReserved(i.t) );
        break;
      case '2':
        renderTimetableNodes.push( this.renderMyReservation(i.t) );
        break;
      case '3':
        renderTimetableNodes.push( this.renderOpen(i.id, i.t) );
        break;
      default:
        break;
      }
    }

    return (
      <div className="time-table-colmuns">
        {renderTimetableNodes}
      </div>
    );
  }
}

TimetableColmuns.propTypes = {
  columns: PropTypes.array.isRequired,
};

export default TimetableColmuns;
