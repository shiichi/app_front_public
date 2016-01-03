import React, { PropTypes, Component } from 'react';
import SelectDate from './SelectDate';
import TimetableBox from './TimetableBox';

class ReservationBox extends Component {
  render() {
    const { isFetching, didInvalidate, isOld, data, fetchTimetableIfNeeded, fetchTestToken } = this.props;
    return (
      <div className="timetable-box">
        <SelectDate
          isFetching = {isFetching}
          fetchTimetableIfNeeded = {fetchTimetableIfNeeded} />
        <TimetableBox
          isFetching = {isFetching}
          didInvalidate = {didInvalidate}
          isOld = {isOld}
          data = {data}
          fetchTimetableIfNeeded = {fetchTimetableIfNeeded}
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
  fetchTimetableIfNeeded: PropTypes.func.isRequired,
  fetchTestToken: PropTypes.func.isRequired
};

export default ReservationBox;
