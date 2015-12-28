import React, { PropTypes, Component } from 'react';
import SelectBox from './SelectBox';
import ReservationBox from './ReservationBox';
import { getSession } from '../../utils/WebStrageUtils';

class MainSection extends Component {
  //typeが変更された時、選択先のtype_idとplaceの状態配列とplanの組合わせ配列より、異動先のplace_idを返す
  getPlaceId(type_id, places, plans) {
    let checked_id = places.map(p => p.checked ? p.id : 0).reduce((x, y) => Number(x) + Number(y));
    let active_ids = plans.map(p => Number(p.type_id) === type_id ? Number(p.place_id) : 10000);

    if ( active_ids.indexOf(checked_id) >= 0 ) {
      return checked_id;
    }

    return Number(Math.min.apply({}, active_ids));
  }

  handleType(type_id) {
    const { places, week } = this.props.selector;
    const plans = getSession('base').plans;
    const place_id = this.getPlaceId(type_id, places, plans);

    const status = {
      flightType: type_id,
      place: place_id,
      week: week,
    };

    this.changeSelectorStatus(status);
    this.fetchTimetable(status);
  }

  handlePlace(place_id) {
    const { flightTypes, week } = this.props.selector;

    const status = {
      flightType: flightTypes.map(t => t.checked ? t.id : 0).reduce((x, y) => Number(x) + Number(y)),
      place: place_id,
      week: week
    };

    this.changeSelectorStatus(status);
    this.fetchTimetable(status);
  }

  handleWeek(n) {
    const { flightTypes, places, week } = this.props.selector;

    //現在選択されているtype,placeのidを取得
    const status = {
      flightType: flightTypes.map(t => t.checked ? t.id : 0).reduce((x, y) => Number(x) + Number(y)),
      place: places.map(t => t.checked ? t.id : 0).reduce((x, y) => Number(x) + Number(y)),
      week: week + n
    };

    this.changeSelectorStatus(status);
    this.fetchTimetable(status);
  }

  fetchTimetableAgain() {
    const { flightTypes, places, week } = this.props.selector;

    const status = {
      flightType: flightTypes.map(t => t.checked ? t.id : 0).reduce((x, y) => Number(x) + Number(y)),
      place: places.map(t => t.checked ? t.id : 0).reduce((x, y) => Number(x) + Number(y)),
      week: week
    };
    this.fetchTimetable(status)
  }

  changeSelectorStatus(status) {
    const { changeTypeChecked, changePlaceChecked, changePlaceActive, changeWeek } = this.props.actions;
    const placeStatus = [];

    for (let i of getSession('base').plans) {
      if (Number(i.type_id) === status.flightType) placeStatus.push(Number(i.place_id));
    }

    changeTypeChecked(status.flightType);
    changePlaceChecked(status.place);
    changePlaceActive(placeStatus);
    changeWeek(status.week);
  }

  fetchTimetable(request) {
    const { fetchTimetableIfNeeded } = this.props.actions;
    let key = request.flightType + '_' + request.place + '_' + request.week;
    fetchTimetableIfNeeded(key, request);
  }

  render() {
    const { selector, isFetching, didInvalidate, isOld, data, validateReservation} = this.props;
    return (
      <div>
        <SelectBox
          selector = {selector}
          isFetching = {isFetching}
          handleType= {this.handleType.bind(this)}
          handlePlace= {this.handlePlace.bind(this)} />
        <ReservationBox
          isFetching = {isFetching}
          didInvalidate = {didInvalidate}
          isOld = {isOld}
          data = {data}
          handleWeek = {this.handleWeek.bind(this)}
          fetchTimetableAgain = {this.fetchTimetableAgain.bind(this)}
          validateReservation = {validateReservation} />
      </div>
    );
  }
}

MainSection.propTypes = {
  selector: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  isOld: PropTypes.bool.isRequired,
  data: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

export default MainSection;
