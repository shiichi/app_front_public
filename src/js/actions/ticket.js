import * as types from '../constants/ActionTypes';
import { CSRFToken, domainName } from '../utils/csrfUtils';
import fetch from 'isomorphic-fetch';

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
    return fetch(domainName + '/api/webpay', {
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
        dispatch(requestTicketSuccess(result));
        dispatch(updateTickets(result.tickets));
        dispatch(addMessage(result.msg));
      })
      .catch(ex => dispatch(requestTicketFail(ex)));
  };
}

export function fetchPin(pin) {
  return dispatch => {
    dispatch(requestTicket());
    return fetch(domainName + '/api/pin', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRFToken
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
      .catch(ex => dispatch(requestTicketFail(ex)));
  };
}
