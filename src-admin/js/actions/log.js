import * as types from '../constants/ActionTypes';
import { fetchWithJson } from '../utils/fetchUtils';
import { REQUEST_LOG } from '../../config/url';

function addMessage(msg) {
  return {
    type: types.ADD_MESSAGE,
    msg: msg
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
    fetchWithJson(REQUEST_LOG)
      .then(response => response.json())
      .then(result => dispatch(requestLogSuccess(result, page)))
      .catch(ex => {
        dispatch(requestLogFail(page));
        const msg = {
          type: 'error',
          msg: 'ログの取得に失敗しました'
        };
        dispatch(setLogPage(page));
        dispatch(addMessage(msg));
      });
  };
}
