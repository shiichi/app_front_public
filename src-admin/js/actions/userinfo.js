import * as types from '../constants/ActionTypes';
import { fetchWithJson } from '../utils/fetchUtils';
import { REQUEST_USER_INFO, UPDATE_USER_PROF, CHANGE_PASSWORD, DEACTIVE_USER } from '../../config/url';

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

export function requestUserInfoFail() {
  return {
    type: types.REQUEST_USERINFO_FAIL
  };
}

export function fetchUserInfo() {
  return dispatch => {
    dispatch(requestUserInfo());
    fetchWithJson(REQUEST_USER_INFO)
    .then(response => response.json())
    .then(result => dispatch(requestUserInfoSuccess(result)))
    .catch(ex => dispatch(requestUserInfoFail()));
  };
}

export function UpdateUserProf(request) {
  return dispatch => {
    dispatch(requestUserInfo());
    fetchWithJson(UPDATE_USER_PROF, request)
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

export function postChangePassword(request) {
  return dispatch => {
    dispatch(changePassword());
    fetchWithJson(CHANGE_PASSWORD, request)
      .then(response => response.json())
      .then(result => dispatch(addMessage(result)))
      .catch(ex => {
        const msg = {
          type: 'error',
          msg: 'パスワードの更新に失敗しました'
        };
        dispatch(addMessage(msg));
      });
  };
}
/*
export function deactiveUser() {
  return dispatch => {
    dispatch(changePassword());
    fetchWithJson(DEACTIVE_USER)
      .then(response => response.json())
      .then(result => dispatch(addMessage(result)))
      .catch(ex => {
        const msg = {
          type: 'error',
          msg: 'アカウントの削除に失敗しました'
        };
        dispatch(addMessage(msg));
      });
  };
}
*/