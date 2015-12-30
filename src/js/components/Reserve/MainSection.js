import React, { PropTypes, Component } from 'react';
import SelectBox from './SelectBox';
import ReservationBox from './ReservationBox';

class MainSection extends Component {
  getCheckedId(status) {
    for (const i of status) if (i.checked) return i.id;
  }

  getCheckedPlaceId(type_id) {
    const { plans, selector: {places}} = this.props;
    const ids = plans[type_id];
    const checkedId = this.getCheckedId(places);

    if ( ids.indexOf(checkedId) >= 0 ) return checkedId;
    return Math.min.apply(null, ids);
  }

  handleSelector(t, p, w) {
    const { plans, selector: {flightTypes, week}, actions: {changeSelectorStatus} } = this.props;
    const status = {
      flightType: t || this.getCheckedId(flightTypes),
      place: p || this.getCheckedPlaceId(t || this.getCheckedId(flightTypes)),
      week: week + w
    };

    changeSelectorStatus(status.flightType, plans[status.flightType], status.place, status.week);
    this.fetchTimetable(status);
  }

  fetchTimetable(request) {
    const { fetchTimetableIfNeeded } = this.props.actions;
    let key = request.flightType + '_' + request.place + '_' + request.week;

    fetchTimetableIfNeeded(key, request);
  }

  fetchTimetableAgain() {
    const { flightTypes, places, week } = this.props.selector;
    const status = {
      flightType: this.getCheckedId(flightTypes),
      place: this.getCheckedId(places),
      week: week
    };
    this.fetchTimetable(status);
  }

  render() {
    const { selector, isFetching, didInvalidate, isOld, data, actions: {fetchTestToken}} = this.props;
    return (
      <div>
        <SelectBox
          selector = {selector}
          isFetching = {isFetching}
          handleSelector= {this.handleSelector.bind(this)}/>
        <ReservationBox
          data = {data}
          isFetching = {isFetching}
          didInvalidate = {didInvalidate}
          isOld = {isOld}
          handleSelector= {this.handleSelector.bind(this)}
          fetchTimetableAgain = {this.fetchTimetableAgain.bind(this)}
          fetchTestToken = {fetchTestToken} />
      </div>
    );
  }
}

MainSection.propTypes = {
  plans: PropTypes.object.isRequired,
  selector: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool,
  isOld: PropTypes.bool,
  data: PropTypes.object,
  actions: PropTypes.object.isRequired,
  fetchTestToken: PropTypes.func.isRequired
};

export default MainSection;
