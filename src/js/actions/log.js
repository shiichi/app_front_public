import * as types from '../constants/ActionTypes';
import { fetchWithJson } from '../utils/fetchUtils';
import { REQUEST_LOG } from '../../config/url';

function requestLog() {
  return {
    type: types.REQUEST_LOG
  };
}

export function requestLogSuccess(data) {
  return {
    type: types.REQUEST_LOG_SUCCESS,
    data: data
  };
}

export function requestLogFail(ex) {
  return {
    type: types.REQUEST_LOG_FAIL,
    ex: ex
  };
}

export function fetchLog(request) {
  return dispatch => {
    dispatch(requestLog());
    fetchWithJson(REQUEST_LOG, request)
      .then(response => response.json())
      .then(result => dispatch(requestLogSuccess(result)))
      .catch(ex => dispatch(requestLogFail(ex)));
  };
}
