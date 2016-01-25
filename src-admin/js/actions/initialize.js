import * as types from '../constants/ActionTypes';

export function deleteAccessAlert(keys) {
  return {
    type: types.DELETE_ACCESS_ALERT,
    keys
  };
}

export function clearValidationAlert() {
  return {
    type: types.CLEAR_VALIDATION_ALERT,
  };
}

export function clearAddress() {
  return {
    type: types.CLEAR_ADDRESS,
  };
}
