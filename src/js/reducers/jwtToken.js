import {
  SET_TEST_TOKEN,
  DELETE_TEST_TOKEN,
  SET_CONF_TOKEN,
  DELETE_CONF_TOKEN
} from '../constants/ActionTypes';

const initialState = {testToken: null};

export default function jwtToken(state = initialState, action) {
  switch (action.type) {
  case SET_TEST_TOKEN:
    return Object.assign({}, state, {
      testToken: action.value
    });

  case DELETE_TEST_TOKEN:
    return Object.assign({}, state, {
      testToken: null
    });

  case SET_CONF_TOKEN:
    let obj = {};
    obj[action.key] = action.value;
    return Object.assign({}, state, obj);

  case DELETE_CONF_TOKEN:
    delete state[action.key];
    return state;

  default:
    return state;
  }
}
