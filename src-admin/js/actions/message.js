import * as types from '../constants/ActionTypes';

export function deleteMessage(id) {
  return {
    type: types.DELETE_MESSAGE,
    id: id
  };
}

export function clearMessage() {
  return {
    type: types.CLEAR_MESSAGE
  };
}
