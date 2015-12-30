import React, { PropTypes, Component } from 'react';
import SelectDate from './SelectDate';
import TimetableBox from './TimetableBox';

class ReservationBox extends Component {
  render() {
    const { isFetching, didInvalidate, isOld, data, handleSelector, fetchTimetableAgain, fetchTestToken } = this.props;
    return (
      <div className="timetable-box">
        <SelectDate
          isFetching = {isFetching}
          handleSelector = {handleSelector} />
        <TimetableBox
          isFetching = {isFetching}
          didInvalidate = {didInvalidate}
          isOld = {isOld}
          data = {data}
          fetchTimetableAgain = {fetchTimetableAgain}
          fetchTestToken = {fetchTestToken} />
      </div>
    );
  }
}

ReservationBox.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool,
  isOld: PropTypes.bool,
  data: PropTypes.object,
  handleWeek: PropTypes.func,
  fetchTimetableAgain: PropTypes.func,
  fetchTestToken: PropTypes.func.isRequired
};

export default ReservationBox;
