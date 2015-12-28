import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { CSRF_TOKEN, DOMAIN_NAME } from '../../config/env';
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

export function validateReservation(request) {
  return dispatch => {
    return fetch(DOMAIN_NAME + '/api/getTestToken', {
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
    return fetch(DOMAIN_NAME + '/api/reserve', {
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
    return fetch(DOMAIN_NAME + '/api/rsvList', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF_TOKEN
      },
      credentials: 'same-origin'
    })
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
    return fetch(DOMAIN_NAME + '/api/cancel', {
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
