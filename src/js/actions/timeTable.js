import * as types from '../constants/ActionTypes';
import { fetchWithJson } from '../utils/fetchUtils';
import { REQUEST_TIMETABLE, REQUEST_DEFAULT_STATUS } from '../../config/url';

function setPlans(plans) {
  return {
    type: types.SET_PLANS,
    plans: plans
  };
}

function setTypeStatus(status) {
  return {
    type: types.SET_TYPE_STATUS,
    status: status
  };
}

function setPlaceStatus(status) {
  return {
    type: types.SET_PLACE_STATUS,
    status: status
  };
}

export function changeSelectorStatus(typeId, placeIds, placeId, n) {
  return dispatch => {
    dispatch(changeTypeChecked(typeId));
    dispatch(changeActivePlace(placeIds));
    dispatch(changePlaceChecked(placeId));
    dispatch(changeWeek(n))
  }
}

function changeTypeChecked(id) {
  return {
    type: types.CHANGE_TYPE_CHECKED,
    id: id
  };
}

function changeActivePlace(ids) {
  return {
    type: types.CHANGE_PLACE_ACTIVE,
    ids: ids
  };
}

function changePlaceChecked(id) {
  return {
    type: types.CHANGE_PLACE_CHECKED,
    id: id
  };
}

function changeWeek(n) {
  return {
    type: types.CHANGE_WEEK,
    week: n
  };
}

function requestTimetable(key) {
  return {
    type: types.REQUEST_TIMETABLE,
    key: key
  };
}

function requestTimetableSuccess(key, data) {
  return {
    type: types.REQUEST_TIMETABLE_SUCCESS,
    key: key,
    data: data,
    //receivedAt: Date.now(),
  };
}

function requestTimetableFail(key) {
  return {
    type: types.REQUEST_TIMETABLE_FAIL,
    key: key
  };
}

export function fetchTimetable(key, request) {
  return dispatch => {
    dispatch(requestTimetable(key));
    fetchWithJson(REQUEST_TIMETABLE, request)
      .then(response => response.json())
      .then(result => dispatch(requestTimetableSuccess(key, result)))
      .catch(ex => dispatch(requestTimetableFail(key)));
  };
}

function shouldFetchTimetable(state, key) {
  const timetable = state.timetables[key];
  if (!timetable) {
    return true;
  }
  if (timetable.isFetching) {
    return false;
  }
  return timetable.isOld;
  //return timetable.didInvalidate;
}

export function fetchTimetableIfNeeded(key, request) {
  return (dispatch, getState) => {
    if (shouldFetchTimetable(getState(), key)) {
      return dispatch(fetchTimetable(key, request));
    }
  };
}

function convertPlans(plans) {
  return plans.reduce((converted, plan) => {
    let { type_id, place_id } = plan;
    if (!converted[type_id]) {
      converted[type_id] = [Number(place_id)];
    } else {
      converted[type_id].push(Number(place_id));
    }
    return converted
  }, {});
}

export function fetchDefaultStatus() {
  return dispatch => {
    fetchWithJson(REQUEST_DEFAULT_STATUS)
      .then(response => response.json())
      .then(result => {
        const { types, places, plans } = result.selector;
        const { key, data } = result.timetable;
        const minTypeId = Math.min.apply({}, plans.map(p => Number(p.type_id)));
        const minPlaceId = Math.min.apply({}, plans.map(p => Number(p.type_id) === minTypeId ? p.place_id : 100000));

        //timetableに登録
        dispatch(setPlans(convertPlans(plans)));
        dispatch(requestTimetableSuccess(key, data));
        //selectorに登録
        dispatch(setTypeStatus(types));
        dispatch(changeTypeChecked(minTypeId));
        dispatch(setPlaceStatus(places));
        dispatch(changeActivePlace(convertPlans(plans)[minTypeId]));
        dispatch(changePlaceChecked(minPlaceId));
      })
      .catch(ex => console.log(ex));
  };
}
