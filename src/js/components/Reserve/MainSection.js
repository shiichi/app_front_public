import React, { PropTypes, Component } from 'react';
import { getLocal, delLocal } from '../../utils/WebStrageUtils';
//components
import SelectBox from './SelectBox';
import ReservationBox from './ReservationBox';

class MainSection extends Component {
  componentDidMount() {
    const { fetchDefaultStatus } = this.props.actions;
    fetchDefaultStatus();
  }

  componentWillReceiveProps(nextProps) {
    const { modal } = nextProps;
    const { timetableKey, actions: {modalOff, reserve} } = this.props;

    if (modal) {
      const loadResult = setInterval(function() {
        const token = getLocal('testConnectionResult');
        if (token) {
          modalOff();
          reserve({ token }, timetableKey);
          delLocal('testConnectionResult');
          return clearInterval(loadResult);
        }
      }, [3000, 500]);
    }
  }

  render() {
    const { selector, data, isFetching, didInvalidate, isOld, actions: {fetchTestToken, fetchTimetableIfNeeded} } = this.props;
    return (
      <div>
        <SelectBox
          selector = {selector}
          isFetching = {isFetching}
          fetchTimetableIfNeeded = {fetchTimetableIfNeeded}/>
        <ReservationBox
          data = {data}
          isFetching = {isFetching}
          didInvalidate = {didInvalidate}
          isOld = {isOld}
          fetchTimetableIfNeeded = {fetchTimetableIfNeeded}
          fetchTestToken = {fetchTestToken}/>
      </div>
    );
  }
}

MainSection.propTypes = {
  selector: PropTypes.object.isRequired,
  data: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool,
  isOld: PropTypes.bool,
  timetableKey: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
