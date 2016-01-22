import * as types from '../constants/ActionTypes';

export function deleteAccessAlert(keys) {
  return {
    type: types.DELETE_ACCESS_ALERT,
    keys
  };
}