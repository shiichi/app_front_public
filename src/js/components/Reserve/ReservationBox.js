import React, { PropTypes, Component } from 'react';
import SelectDate from './SelectDate';
import TimetableBox from './TimetableBox';

class ReservationBox extends Component {
  render() {
    const { isFetching, didInvalidate, data, handleWeek, fetchTimetableAgain, validateReservation } = this.props;
    return (
      <div className="timetable-box">
        <SelectDate
          isFetching = {isFetching}
          handleWeek = {handleWeek} />
        <TimetableBox
          isFetching = {isFetching}
          didInvalidate = {didInvalidate}
          data = {data}
          fetchTimetableAgain = {fetchTimetableAgain}
          validateReservation = {validateReservation} />
      </div>
    );
  }
}

ReservationBox.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  data: PropTypes.object,
  handleWeek: PropTypes.function,
  fetchTimetableAgain: PropTypes.function
};

export default ReservationBox;
