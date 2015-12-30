import React, { PropTypes, Component } from 'react';
import SelectBox from './SelectBox';
import ReservationBox from './ReservationBox';

class MainSection extends Component {
  //typeが変更された時、選択先のtype_idとplaceの状態配列とplanの組合わせ配列より、異動先のplace_idを返す
  getPlaceId(type_id, places, plans) {
    const ids = plans[type_id];
    const checkedId = (p => {
      for (const i of p) if (i.checked) return i.id;
    })(places);

    if ( ids.indexOf(checkedId) >= 0 ) return checkedId;
    else return Math.min.ids;
  }

  handleType(type_id) {
    const { plans, selector: {places, week}} = this.props;
    const place_id = this.getPlaceId(type_id, places, plans);

    const status = {
      flightType: type_id,
      place: place_id,
      week: week
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
    this.fetchTimetable(status);
  }

  changeSelectorStatus(status) {
    const { plans, actions: {changeTypeChecked, changePlaceChecked, changeActivePlace, changeWeek}} = this.props;
    /*const placeStatus = [];

    for (let i of plans) {
      if (Number(i.type_id) === status.flightType) placeStatus.push(Number(i.place_id));
    }
*/
    changeTypeChecked(status.flightType);
    changePlaceChecked(status.place);
    changeActivePlace(plans[status.flightType]);
    changeWeek(status.week);
  }

  fetchTimetable(request) {
    const { fetchTimetableIfNeeded } = this.props.actions;
    let key = request.flightType + '_' + request.place + '_' + request.week;
    fetchTimetableIfNeeded(key, request);
  }

  render() {
    const { selector, isFetching, didInvalidate, isOld, data, actions: {fetchTestToken}} = this.props;
    return (
      <div>
        <SelectBox
          selector = {selector}
          isFetching = {isFetching}
          handleType= {this.handleType.bind(this)}
          handlePlace= {this.handlePlace.bind(this)} />
        <ReservationBox
          data = {data}
          isFetching = {isFetching}
          didInvalidate = {didInvalidate}
          isOld = {isOld}
          handleWeek = {this.handleWeek.bind(this)}
          fetchTimetableAgain = {this.fetchTimetableAgain.bind(this)}
          fetchTestToken = {fetchTestToken} />
      </div>
    );
  }
}

MainSection.propTypes = {
  selector: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool,
  isOld: PropTypes.bool,
  data: PropTypes.object,
  actions: PropTypes.object.isRequired,
  fetchTestToken: PropTypes.func.isRequired
};

export default MainSection;
