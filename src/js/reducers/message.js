import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  CLEAR_MESSAGE
} from '../constants/ActionTypes';

const initialState = [];

export default function message(state = initialState, action) {
  switch (action.type) {
  case ADD_MESSAGE:
    return [
      {
        id: state.reduce((maxId, msg) => Math.max(msg.id, maxId), -1) + 1,
        type: action.msg.type,
        msg: action.msg.msg
      },
      ...state
    ];

  case DELETE_MESSAGE:
    return state.filter(msg =>
        msg.id !== action.id
      );

  case CLEAR_MESSAGE:
    return [];

  default:
    return state;
  }
}
