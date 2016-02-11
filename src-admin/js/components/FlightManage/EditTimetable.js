import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';

//Components
import SelectDate from './SelectDate';
import TimetableBox from './TimetableBox';

class EditTimetable extends Component {
  constructor(props) {
    super(props);
    props.fetchTimetable({
      type: 1,
      place: 1,
      days: [0,1,2,3,4,5,6]
    });
  }

  render() {
    const S = {
      btn: {
        position: 'fixed',
        width: 10,
        height: '50%',
        zIndex: 1900,
      },
      icon: {
        position: 'fixed',
        width: 10,
        height: '100%',
        zIndex: 1900,
      },
      back: {

      },
      next:{

      },
      timetable: {

      }
    }

    const { timetable, isFetching, didInvalidate, fetchTimetable } = this.props;
    return (
      <div>
        <RaisedButton label="Default" style={S.btn}/>
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
