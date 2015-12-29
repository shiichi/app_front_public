import * as types from '../constants/ActionTypes';
import { fetchWithJson } from '../utils/fetchUtils';
import { REQUEST_LOG } from '../../config/url';

function addMessage(msg) {
  return {
    type: types.ADD_MESSAGE,
    msg: msg
  };
}

function requestLog() {
  return {
    type: types.REQUEST_LOG
  };
}

function requestLogSuccess(data) {
  return {
    type: types.REQUEST_LOG_SUCCESS,
    data: data
  };
}

function requestLogFail() {
  return {
    type: types.REQUEST_LOG_FAIL
  };
}

export function fetchLog(request) {
  return dispatch => {
    dispatch(requestLog());
    fetchWithJson(REQUEST_LOG, request)
      .then(response => response.json())
      .then(result => dispatch(requestLogSuccess(result)))
      .catch(ex => {
        dispatch(requestLogFail());
        const msg = {
          type: 'error',
          msg: 'ログの取得に失敗しました'
        };
        dispatch(addMessage(msg));
      });
  };
}
