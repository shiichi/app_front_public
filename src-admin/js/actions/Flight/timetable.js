import * as types from '../../constants/ActionTypes';
import { customFetch } from '../../utils/FetchUtils';

function addSideAlert(status, messageId, value) {
  return {
    type: types.ADD_SIDE_ALERT,
    status,
    messageId,
    value
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
    customFetch('api/getTimetable', 'POST', request)
    .then(result => {
      dispatch(requestTimetableSuccess(key, result));
    })
    .catch(ex => {
      dispatch(requestTimetableFail(key));
    })
  };
}
