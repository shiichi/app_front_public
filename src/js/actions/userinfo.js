import * as types from '../constants/ActionTypes';
import { CSRFToken, domainName } from '../utils/csrfUtils';
import fetch from 'isomorphic-fetch';

export function addMessage(msg) {
  return {
    type: types.ADD_MESSAGE,
    msg: msg
  };
}

function requestUserInfo() {
  return {
    type: types.REQUEST_USERINFO
  };
}

export function requestUserInfoSuccess(data) {
  return {
    type: types.REQUEST_USERINFO_SUCCESS,
    data: data
  };
}

export function requestUserInfoFail(ex) {
  return {
    type: types.REQUEST_USERINFO_FAIL,
    ex: ex
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
        'X-CSRF-Token': CSRFToken
      },
      credentials: 'same-origin',
      body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(result => dispatch(requestUserInfoSuccess(result)))
    .catch(ex => dispatch(requestUserInfoFail(ex)));
  };
}

function updateUserProf() {
  return {
    type: types.UPDATE_USERPROF,
  };
}

export function updateUserProfSuccess(data) {
  return {
    type: types.UPDATE_USERPROF_SUCCESS,
    data: data
  };
}

export function updateUserProfFail(ex) {
  return {
    type: types.UPDATE_USERPROF_FAIL,
    ex: ex
  };
}

export function fetchUpdateUserProf(request) {
  return dispatch => {
    dispatch(updateUserProf());
    return fetch(domainName + '/api/updateUserProf', {
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
      .then(result => {
        dispatch(updateUserProfSuccess(result.userProf));
        dispatch(addMessage(result.msg));
      })
      .catch(ex => dispatch(updateUserProfFail(ex)));
  };
}

function changePassword() {
  return {
    type: types.CHANGE_PASS
  };
}

export function changePasswordFail(ex) {
  return {
    type: types.CHANGE_PASS_FAIL,
    ex: ex
  };
}

export function postChangePassword(request) {
  return dispatch => {
    dispatch(changePassword());
    return fetch(domainName + '/api/changePassword', {
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
      .then(result => dispatch(addMessage(result)))
      .catch(ex => dispatch(changePasswordFail(ex)));
  };
}
