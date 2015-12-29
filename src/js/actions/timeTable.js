import * as types from '../constants/ActionTypes';
import { fetchWithJson } from '../utils/fetchUtils';
import { REQUEST_TIMETABLE, REQUEST_DEFAULT_STATUS } from '../../config/url';

export function changeWeek(week) {
  return {
    type: types.CHANGE_WEEK,
    week: week
  };
}

export function setPlans(plans) {
  return {
    type: types.SET_PLANS,
    plans: plans
  };
}

export function setTypeStatus(status) {
  return {
    type: types.SET_TYPE_STATUS,
    status: status
  };
}

export function changeTypeChecked(id) {
  return {
    type: types.CHANGE_TYPE_CHECKED,
    id: id
  };
}

export function setPlaceStatus(status) {
  return {
    type: types.SET_PLACE_STATUS,
    status: status
  };
}

export function changePlaceActive(ids) {
  return {
    type: types.CHANGE_PLACE_ACTIVE,
    ids: ids
  };
}

export function changePlaceChecked(id) {
  return {
    type: types.CHANGE_PLACE_CHECKED,
    id: id
  };
}

function requestTimetable(key) {
  return {
    type: types.REQUEST_TIMETABLE,
    key: key,
  };
}

export function requestTimetableSuccess(key, data) {
  return {
    type: types.REQUEST_TIMETABLE_SUCCESS,
    key: key,
    data: data,
    //receivedAt: Date.now(),
  };
}

export function requestTimetableFail(key) {
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
  const timetable = state.timetable[key];
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

export function fetchDefaultStatus() {
  return dispatch => {
    fetchWithJson(REQUEST_DEFAULT_STATUS)
      .then(response => response.json())
      .then(result => {
        const { types, places, plans } = result.selector;
        const { key, data } = result.timetable;
        const minTypeId = Math.min.apply({}, plans.map(p => p.type_id ));
        const minPlaceId = Math.min.apply({}, plans.map(p => Number(p.type_id) === minTypeId ? p.place_id : 100000));
        //timetableに登録
        dispatch(setPlans(plans));
        dispatch(requestTimetableSuccess(key, data));
        //selectorに登録
        dispatch(setTypeStatus( types ));
        dispatch(changeTypeChecked( minTypeId ));
        dispatch(setPlaceStatus( places ));
        dispatch(changePlaceChecked( minPlaceId ));
      })
      .catch(ex => dispatch(requestTimetableFail(key)));
  };
}
