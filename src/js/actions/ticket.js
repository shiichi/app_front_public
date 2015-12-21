import * as types from '../constants/ActionTypes';
//import { CSRFToken, domainName } from '../utils/csrfUtils';
//import fetch from 'isomorphic-fetch';

export function changeTicketPanel(key) {
  return {
    type: types.CHANGE_TICKET_PANEL,
    key: key,
  };
}

function requestWebpay() {
  return {
    type: types.REQUEST_WEBPAY,
  };
}

export function requestWebpaySuccess(data) {
  return {
    type: types.REQUEST_WEBPAY_SUCCESS,
    data: data,
  };
}

export function requestWebpayFail(ex) {
  return {
    type: types.REQUEST_WEBPAY_FAIL,
    ex: ex,
  };
}

export function fetchWebpay(request) {
  return dispatch => {
    dispatch(requestWebpay());
    return fetch(domainName + '/api/webpay', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRFToken,
      },
      credentials: 'same-origin',
      body: JSON.stringify(request),
    })
    .then(response => response.json())
    .then(result => dispatch(requestTimetableSuccess(result)))
    .catch(ex => dispatch(requestTimetableFail(ex)));
  };
}