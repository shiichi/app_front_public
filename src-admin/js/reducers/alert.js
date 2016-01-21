import {
  ADD_ACCESS_ALERT,
  DELETE_ACCESS_ALERT,
} from '../constants/ActionTypes';

function change(state = [], action) {
  switch (action.type) {
  case ADD_ACCESS_ALERT:
    const maxId = state.reduce((maxId, m) => Math.max(m.id, maxId), -1);
    const latestMsg = state.filter(m => m.id >= maxId);
    return [{
      id: maxId + 1,
      status: action.status,
      msg: action.msg
    }, ...latestMsg ];

  case DELETE_ACCESS_ALERT:
    return state

  default:
    return state;
  }
}

export default function alert(state = {}, action) {
  switch (action.type) {
  case ADD_ACCESS_ALERT:
  case DELETE_ACCESS_ALERT:
    return Object.assign({}, state, {
      access: change(state.access, action)
    });

  default:
    return state;
  }
}