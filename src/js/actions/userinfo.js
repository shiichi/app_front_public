import * as types from '../constants/ActionTypes';
import { fetchWithJson } from '../utils/fetchUtils';
import { REQUEST_USER_INFO, UPDATE_USER_PROF, CHANGE_PASSWORD } from '../../config/url';

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
    fetchWithJson(REQUEST_USER_INFO, request)
    .then(response => response.json())
    .then(result => dispatch(requestUserInfoSuccess(result)))
    .catch(ex => dispatch(requestUserInfoFail(ex)));
  };
}

export function fetchUpdateUserProf(request) {
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

export function changePasswordFail(ex) {
  return {
    type: types.CHANGE_PASS_FAIL,
    ex: ex
  };
}

export function postChangePassword(request) {
  return dispatch => {
    dispatch(changePassword());
    fetchWithJson(CHANGE_PASSWORD, request)
      .then(response => response.json())
      .then(result => dispatch(addMessage(result)))
      .catch(ex => dispatch(changePasswordFail(ex)));
  };
}
