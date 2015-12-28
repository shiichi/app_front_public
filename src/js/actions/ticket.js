import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { CSRF_TOKEN, DOMAIN_NAME } from '../../config/env';

export function addMessage(msg) {
  return {
    type: types.ADD_MESSAGE,
    msg: msg
  };
}

function updateTickets(num) {
  return {
    type: types.UPDATE_USERINFO_TICKETS,
    num: num
  };
}

function requestTicket() {
  return {
    type: types.REQUEST_TICKET
  };
}

export function requestTicketSuccess(data) {
  return {
    type: types.REQUEST_TICKET_SUCCESS,
    data: data
  };
}

export function requestTicketFail(ex) {
  return {
    type: types.REQUEST_TICKET_FAIL,
    ex: ex
  };
}

export function fetchWebpay(request) {
  return dispatch => {
    dispatch(requestTicket());
    return fetch(DOMAIN_NAME + '/api/webpay', {
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
        dispatch(requestTicketSuccess(result));
        dispatch(updateTickets(result.tickets));
        dispatch(addMessage(result.msg));
      })
      .catch(ex => {
        dispatch(requestTicketFail(ex));
        const msg = {
          type: 'error',
          msg: 'チケット購入に失敗しました'
        };
        dispatch(addMessage(msg));
      });
  };
}

export function fetchPin(pin) {
  return dispatch => {
    dispatch(requestTicket());
    return fetch(DOMAIN_NAME + '/api/pin', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF_TOKEN
      },
      credentials: 'same-origin',
      body: JSON.stringify(pin)
    })
      .then(response => response.json())
      .then(result => {
        dispatch(requestTicketSuccess(result));
        dispatch(updateTickets(result.tickets));
        dispatch(addMessage(result.msg));
      })
      .catch(ex => {
        dispatch(requestTicketFail(ex));
        const msg = {
          type: 'error',
          msg: 'チケット購入に失敗しました'
        };
        dispatch(addMessage(msg));
      });
  };
}
