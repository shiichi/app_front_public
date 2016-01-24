import {
  REQUEST_ROLES,
  REQUEST_ROLES_SUCCESS,
  REQUEST_ROLES_FAIL
} from '../constants/ActionTypes';

const initialState = {
  roles: [],
  isFetching: false,
  didInvalidate: false,
};

export default function roles(state = initialState, action) {
  switch (action.type) {
  case REQUEST_ROLES:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case REQUEST_ROLES_SUCCESS:
    return Object.assign({}, state, {
      roles: action.roles,
      isFetching: false
    });

  case REQUEST_ROLES_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });

  default:
    return state;
  }
}
