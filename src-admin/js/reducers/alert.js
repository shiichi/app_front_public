import {
  ADD_ACCESS_ALERT,
  DELETE_ACCESS_ALERT,
} from '../constants/ActionTypes';

function change(state = [], action) {
  switch (action.type) {
  case ADD_ACCESS_ALERT:
    return Object.assign({}, state, {
      [Date.now()]: {
        status: action.status,
        msg: action.msg
      }
    })

  case DELETE_ACCESS_ALERT:
    return Object.keys(state)
      .filter(key => action.keys.indexOf(key) === -1)
      .reduce((alerts, key) => {
        alerts[key] = {
          status: state[key].status,
          msg: state[key].msg
        };
        return alerts;
      }, {});

  default:
    return state;
  }
}

const initialState = {
  access: {}
};

export default function alert(state = initialState, action) {
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