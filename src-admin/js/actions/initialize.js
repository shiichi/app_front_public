import * as types from '../constants/ActionTypes';

export function deleteAccessAlerts(keys) {
  return {
    type: types.DELETE_ACCESS_ALERT,
    keys
  };
}

export function clearDisposable() {
  return {
    type: types.CLEAR_DISPOSABLE,
  };
}
