import {
  SIDEVAR_ON,
  SIDEVAR_OFF,
  CHANGE_SIDEVAR
} from '../constants/ActionTypes';

const initialState = {
  sidebar: true
};

export default function message(state = initialState, action) {
  switch (action.type) {
  case SIDEVAR_ON:
    return Object.assign({}, state, {
      sidebar: true
    });

  case SIDEVAR_OFF:
    return Object.assign({}, state, {
      sidebar: false
    });

  case CHANGE_SIDEVAR:
    return Object.assign({}, state, {
      sidebar: !state.sidebar
    });

  default:
    return state;
  }
}
