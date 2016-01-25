import {
  REQUEST_USER,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAIL,
} from '../constants/ActionTypes';

const initialState = {
  user: null,
  isFetching: false,
  didInvalidate: false,
};

export default function editUser(state = initialState, action) {
  switch (action.type) {
  case REQUEST_USER:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case REQUEST_USER_SUCCESS:
    return Object.assign({}, state, {
      user: Object.assign(action.user,
        { assigneesRoles: action.user.roles.map(role => role.id) }
      ),
      isFetching: false
    });

  case REQUEST_USER_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });

  default:
    return state;
  }
}
