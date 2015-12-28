import * as types from '../constants/ActionTypes';
import { CSRFToken, domainName } from '../utils/csrfUtils';
import fetch from 'isomorphic-fetch';
import { setLocal, delLocal } from '../utils/WebStrageUtils';

export function addMessage(msg) {
  return {
    type: types.ADD_MESSAGE,
    msg: msg
  };
}

export function deleteMessage(id) {
  return {
    type: types.DELETE_MESSAGE,
    id: id
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
    return fetch(domainName + '/api/getTestToken', {
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
        if (result.msg.type === 'error') {
          dispatch(addMessage(result.msg));
        }
        if (result.msg.type === 'success') {
          setLocal('testConnection', result.jwt);
          dispatch(modalOn());
        }
      })
      .catch(ex => console.log(ex));
  };
}

export function reserve(request, key) {
  return dispatch => {
    return fetch(domainName + '/api/reserve', {
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
      .catch(ex => console.log(ex));
  };
}

export function getDefaultRsv() {
  return dispatch => {
    return fetch(domainName + '/api/rsvList', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRFToken
      },
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(result => dispatch(setReservation(result)))
      .catch(ex => console.log(ex));
  };
}

export function cancel(request) {
  return dispatch => {
    return fetch(domainName + '/api/cancel', {
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
      .catch(ex => console.log(ex));
  };
}
