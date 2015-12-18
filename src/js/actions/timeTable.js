import * as types from '../constants/ActionTypes';
import { CSRFToken, domainName } from '../utils/csrfUtils';
import fetch from 'isomorphic-fetch';
import { setSession } from '../utils/WebStrageUtils';

export function changeWeek(week) {
  return {
    type: types.CHANGE_WEEK,
    week: week
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
    key: key,
  };
}

export function fetchTimetable(key, request) {
  return dispatch => {
    dispatch(requestTimetable(key));
    return fetch(domainName + '/api/timetable', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRFToken,
      },
      credentials: 'same-origin',
      body: JSON.stringify(request),
    })
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
  return timetable.didInvalidate;
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
    return fetch(domainName + '/api/getDefaultStatus', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRFToken
      },
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(result => {
        const { types, places, plans } = result.selector;
        const { key, data } = result.timetable;
        const minTypeId = Math.min.apply({}, plans.map(p => p.type_id ));
        const minPlaceId = Math.min.apply({}, plans.map(p => Number(p.type_id) === minTypeId ? p.place_id : 100000));

        setSession('base', result.selector);

        dispatch(requestTimetableSuccess(key, data));

        //TypeSelectBoxに登録
        dispatch(setTypeStatus( types ));
        dispatch(changeTypeChecked( minTypeId ));
        //PlaceSelectBoxに登録
        dispatch(setPlaceStatus( places ));
        dispatch(changePlaceChecked( minPlaceId ));
      })
      .catch(ex => console.log('parsing failed', ex));
  };
}
