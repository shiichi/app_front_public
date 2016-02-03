import * as types from '../constants/ActionTypes';
import { customFetch } from '../utils/fetchUtils';
import { REQUEST_LOG } from '../../config/url';

function addSideAlert(status, messageId, value) {
  return {
    type: types.ADD_SIDE_ALERT,
    status,
    messageId,
    value
  };
}

export function clearLog() {
  return {
    type: types.CLEAR_LOG
  };
}

function setLogPage(page) {
  return {
    type: types.SET_LOG_PAGE,
    page: page
  };
}

function requestLog(page) {
  return {
    type: types.REQUEST_LOG,
    page: page
  };
}

function requestLogSuccess(data, page) {
  return {
    type: types.REQUEST_LOG_SUCCESS,
    data: data,
    page: page
  };
}

function requestLogFail(page) {
  return {
    type: types.REQUEST_LOG_FAIL,
    page: page
  };
}

export function fetchLog(page) {
  return dispatch => {
    dispatch(requestLog(page));
    customFetch(REQUEST_LOG, 'POST')
    .then(result => {
      dispatch(requestLogSuccess(result, page));
    })
    .catch(ex => {
      dispatch(requestLogFail(page));
      dispatch(addSideAlert('danger', 'getLog.fail'));
    })
  }
}
