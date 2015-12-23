import * as types from '../constants/ActionTypes';
import { CSRFToken, domainName } from '../utils/csrfUtils';
import fetch from 'isomorphic-fetch';

function requestUserInfo() {
  return {
    type: types.REQUEST_USERINFO,
  };
}

export function requestUserInfoSuccess(data) {
  return {
    type: types.REQUEST_USERINFO_SUCCESS,
    data: data,
  };
}

export function requestUserInfoFail(ex) {
  return {
    type: types.REQUEST_USERINFO_FAIL,
    ex: ex,
  };
}

export function fetchUserInfo(key, request) {
  return dispatch => {
    dispatch(requestUserInfo());
    return fetch(domainName + '/api/getUserInfo', {
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
    .then(result => dispatch(requestUserInfoSuccess(result)))
    .catch(ex => dispatch(requestUserInfoFail(ex)));
  };
}

function requestUserProf() {
  return {
    type: types.REQUEST_USERPROF,
  };
}

export function requestUserProfSuccess(data) {
  return {
    type: types.REQUEST_USERPROF_SUCCESS,
    data: data,
  };
}

export function requestUserProfFail(ex) {
  return {
    type: types.REQUEST_USERPROF_FAIL,
    ex: ex,
  };
}

export function fetchUserProf(key, request) {
  return dispatch => {
    dispatch(requestUserProf());
    return fetch(domainName + '/api/getUserProf', {
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
      .then(result => dispatch(requestUserProfSuccess(result)))
      .catch(ex => dispatch(requestUserProfFail(ex)));
  };
}
