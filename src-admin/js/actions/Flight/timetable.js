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
    key
  };
}

function requestTimetableSuccess(key, timetables) {
  return {
    type: types.REQUEST_TIMETABLE_SUCCESS,
    key,
    timetables,
  };
}

function requestTimetableFail(key) {
  return {
    type: types.REQUEST_TIMETABLE_FAIL,
    key
  };
}

export function fetchTimetable(request) {
  return dispatch => {
    const key = `${request.type}_${request.type}`;
    dispatch(requestTimetable(key));
    customFetch('flight/timetables', 'POST', request)
    .then(result => {
      dispatch(requestTimetableSuccess(key, result));
    })
    .catch(ex => {
      dispatch(requestTimetableFail(key));
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    })
  };
}
