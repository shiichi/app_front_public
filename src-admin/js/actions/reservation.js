import * as types from '../constants/ActionTypes';
import { fetchWithJson } from '../utils/fetchUtils';
import { REQUEST_TEST_TOKEN, RESERVE, REQUEST_RESERVATIONS, GETJWT, CANCEL } from '../../config/url';

function addMessage(msg) {
  return {
    type: types.ADD_MESSAGE,
    msg: msg
  };
}

function setTestToken(value) {
  return {
    type: types.SET_TEST_TOKEN,
    value: value
  };
}

function deleteTestToken() {
  return {
    type: types.DELETE_TEST_TOKEN
  };
}

function setConfToken(token) {
  return {
    type: types.SET_CONF_TOKEN,
    token: token
  };
}

function deleteConfToken(key) {
  return {
    type: types.DELETE_CONF_TOKEN,
    key: key
  };
}

function timetableIsOld(key) {
  return {
    type: types.TIMETABLE_IS_OLD,
    key: key
  };
}

function modalOn() {
  return {
    type: types.MODAL_ON
  };
}

export function modalOff() {
  return {
    type: types.MODAL_OFF
  };
}

function updateUserInfoReservations(num) {
  return {
    type: types.UPDATE_USERINFO_RESERVATION,
    num: num
  };
}

function RequestReservations() {
  return {
    type: types.REQUEST_RESERVATIONS
  };
}

function RequestReservationsSuccess(data) {
  return {
    type: types.REQUEST_RESERVATIONS_SUCCESS,
    data: data
  };
}

function RequestReservationsFail() {
  return {
    type: types.REQUEST_RESERVATIONS_FAIL
  };
}

export function fetchReservations() {
  return dispatch => {
    dispatch(RequestReservations());
    fetchWithJson(REQUEST_RESERVATIONS)
      .then(response => response.json())
      .then(result => dispatch(RequestReservationsSuccess(result)))
      .catch(ex => {
        dispatch(RequestReservationsFail());
        const msg = {
          type: 'error',
          msg: '予約情報の取得に失敗しました'
        };
        dispatch(addMessage(msg));
      });
  };
}

export function fetchTestToken(request) {
  return dispatch => {
    fetchWithJson(REQUEST_TEST_TOKEN, request)
      .then(response => response.json())
      .then(result => {
        if (result.msg.type === 'error') {
          dispatch(addMessage(result.msg));
        }
        if (result.msg.type === 'success') {
          dispatch(setTestToken(result.jwt));
          dispatch(modalOn());
        }
      })
      .catch(ex => {
        const msg = {
          type: 'error',
          msg: '接続テストを実行できませんでした'
        };
        dispatch(addMessage(msg));
      });
  };
}

export function reserve(request, key) {
  return dispatch => {
    fetchWithJson(RESERVE, request)
      .then(response => response.json())
      .then(result => {
        if (result.msg.type === 'error') {
          dispatch(addMessage(result.msg));
        }
        if (result.msg.type === 'success') {
          dispatch(deleteTestToken());
          dispatch(setConfToken(result.jwt));
          dispatch(updateUserInfoReservations(result.reservations));
          dispatch(timetableIsOld(key));
          dispatch(addMessage(result.msg));
        }
      })
      .catch(ex => {
        const msg = {
          type: 'error',
          msg: '予約に失敗しました'
        };
        dispatch(addMessage(msg));
      }); };
}

export function getJwtIfNeeded(id) {
  return (dispatch, getState) => {
    if (!getState().jwtToken[id]) {
      return dispatch(getJwt());
    }
  };
}

function getJwt() {
  return dispatch => {
    fetchWithJson(GETJWT)
      .then(response => response.json())
      .then(result => dispatch(setConfToken(result)))
      .catch(ex => {
        const msg = {
          type: 'error',
          msg: '予約トークンを取得できません'
        };
        dispatch(addMessage(msg));
      });
  };
}

export function cancel(request) {
  return dispatch => {
    fetchWithJson(CANCEL, request)
      .then(response => response.json())
      .then(result => {
        if (result.msg.type === 'error') {
          dispatch(addMessage(result.msg));
        }
        if (result.msg.type === 'success') {
          dispatch(deleteConfToken(request.id));
          dispatch(RequestReservationsSuccess(result.data));
          dispatch(updateUserInfoReservations(result.reservations));
          dispatch(addMessage(result.msg));
        }
      })
      .catch(ex => {
        const msg = {
          type: 'error',
          msg: '予約のキャンセルに失敗しました'
        };
        dispatch(addMessage(msg));
      });
  };
}
