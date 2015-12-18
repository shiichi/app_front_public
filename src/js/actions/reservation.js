import * as types from '../constants/ActionTypes';
import { CSRFToken, domainName } from '../utils/csrfUtils';
import fetch from 'isomorphic-fetch';
import { setLocal, delLocal } from '../utils/WebStrageUtils';

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

export function reserve(request) {
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

        if (result.type === 'error') {
          dispatch(addMessage(result.msg));
        }
        if (result.type === 'success') {

          const tokenId = 'flight' + request.id;
          delLocal(tokenId);
          localStorage.removeItem(tokenId);
          dispatch(addMessage(result));
          dispatch(getDefaultRsv());
        }
      })
      .catch(ex => console.log(ex));
  };
}
