import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
//Components
import SelectDate from './SelectDate';
import TimetableBox from './TimetableBox';

class EditTimetable extends Component {
  constructor(props, context) {
    super(props, context);
    // this.props.actions.fetchTimetable('1_1_0', {
    //   flight_type: 1,
    //   place: 1,
    //   week:0
    // });
  }

  render() {
    const { timetable, isFetching, didInvalidate, fetchTimetable } = this.props;
    return (
      <div className="timetable-box">
        <SelectDate
          isFetching={isFetching}
          fetchTimetable={fetchTimetable}/>
        <TimetableBox
          timetable={timetable}
          isFetching={isFetching}
          didInvalidate={didInvalidate}
          fetchTimetable={fetchTimetable}/>
      </div>
    );
  }
}

EditTimetable.propTypes = {
  timetable: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  fetchTimetable: PropTypes.func.isRequired
};

export default EditTimetable;
