import * as types from '../constants/ActionTypes';
import { fetchWithJson } from '../utils/fetchUtils';
import { REQUEST_TEST_TOKEN, RESERVE, REQUEST_RESERVATION_LIST, CANCEL } from '../../config/url';
import { setLocal, delLocal } from '../utils/WebStrageUtils';

export function addMessage(msg) {
  return {
    type: types.ADD_MESSAGE,
    msg: msg
  };
}

export function timetableIsOld(key) {
  return {
    type: types.TIMETABLE_IS_OLD,
    key: key
  };
}

export function modalOn() {
  return {
    type: types.MODAL_ON
  };
}

export function modalOff() {
  return {
    type: types.MODAL_OFF
  };
}

function updateReservation(num) {
  return {
    type: types.UPDATE_USERINFO_RESERVATION,
    num: num
  };
}

export function setReservation(rsvs) {
  return {
    type: types.SET_RESERVATION,
    rsvs: rsvs
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
          setLocal('testConnection', result.jwt);
          dispatch(modalOn());
        }
      })
      .catch(ex => {
        const msg = {
          type: 'error',
          msg: '接続テストを実行できませんでした' + ex
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
          delLocal('testConnectionResult');
          const tokenId = 'flight' + result.jwt.id;
          setLocal(tokenId, result.jwt.token);
          dispatch(addMessage(result.msg));
          dispatch(updateReservation(result.reservations));
          dispatch(timetableIsOld(key));
        }
      })
      .catch(ex => {
        const msg = {
          type: 'error',
          msg: '予約に失敗しました' + ex
        };
        dispatch(addMessage(msg));
      }); };
}

export function getDefaultRsv() {
  return dispatch => {
    fetchWithJson(REQUEST_RESERVATION_LIST)
      .then(response => response.json())
      .then(result => dispatch(setReservation(result)))
      .catch(ex => {
        const msg = {
          type: 'error',
          msg: '予約情報の取得に失敗しました' + ex
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
          const tokenId = 'flight' + request.id;
          delLocal(tokenId);
          localStorage.removeItem(tokenId);

          dispatch(addMessage(result.msg));
          dispatch(getDefaultRsv());
          dispatch(updateReservation(result.reservations));
        }
      })
      .catch(ex => {
        const msg = {
          type: 'error',
          msg: '予約のキャンセルに失敗しました' + ex
        };
        dispatch(addMessage(msg));
      });
  };
}
