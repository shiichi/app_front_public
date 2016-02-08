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
    const { data, isFetching, didInvalidate, fetchTimetableIfNeeded } = this.props;
    return (
      <div className="timetable-box">
        <SelectDate
          isFetching={isFetching}
          fetchTimetableIfNeeded={fetchTimetableIfNeeded}/>
        <TimetableBox
          isFetching={isFetching}
          didInvalidate={didInvalidate}
          data={data}
          fetchTimetableIfNeeded={fetchTimetableIfNeeded}/>
      </div>
    );
  }
}

EditTimetable.propTypes = {
  routing: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

export default connect(mapStateToProps)(EditTimetable);
