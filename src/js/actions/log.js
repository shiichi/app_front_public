import * as types from '../constants/ActionTypes';
import { CSRFToken, domainName } from '../utils/csrfUtils';
import fetch from 'isomorphic-fetch';

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

export function fetchLog(key, request) {
  return dispatch => {
    dispatch(requestLog());
    return fetch(domainName + '/api/getLog', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRFToken
      },
      credentials: 'same-origin',
      body: JSON.stringify(request)
    })
      .then(response => response.json())
      .then(result => dispatch(requestLogSuccess(result)))
      .catch(ex => dispatch(requestLogFail(ex)));
  };
}
