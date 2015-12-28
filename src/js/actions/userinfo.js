import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { CSRF_TOKEN, DOMAIN_NAME } from '../../config/env';

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
    return fetch(DOMAIN_NAME + '/api/getUserInfo', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF_TOKEN
      },
      credentials: 'same-origin',
      body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(result => dispatch(requestUserInfoSuccess(result)))
    .catch(ex => dispatch(requestUserInfoFail(ex)));
  };
}

export function fetchUpdateUserProf(request) {
  return dispatch => {
    dispatch(requestUserInfo());
    return fetch(DOMAIN_NAME + '/api/updateUserProf', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF_TOKEN
      },
      credentials: 'same-origin',
      body: JSON.stringify(request)
    })
      .then(response => response.json())
      .then(result => {
        dispatch(requestUserInfoSuccess(result.userProf));
        dispatch(addMessage(result.msg));
      })
      .catch(ex => {
        dispatch(requestUserInfoFail(ex));
        const msg = {
          type: 'error',
          msg: 'ユーザー情報の更新に失敗しました'
        };
        dispatch(addMessage(msg));
      });
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
    return fetch(DOMAIN_NAME + '/api/changePassword', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF_TOKEN
      },
      credentials: 'same-origin',
      body: JSON.stringify(request)
    })
      .then(response => response.json())
      .then(result => dispatch(addMessage(result)))
      .catch(ex => dispatch(changePasswordFail(ex)));
  };
}
