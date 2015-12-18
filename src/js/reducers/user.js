import {
  REQUEST_USERINFO,
  REQUEST_USERINFO_SUCCESS,
  REQUEST_USERINFO_FAIL,
} from '../constants/ActionTypes';

const initialState = {
  name: '',
  status: {
    reservations: '',
    remainingTickets: '',
  }
};

export default function user(state = initialState, action) {
  switch (action.type) {

  case REQUEST_USERINFO:
    return state;

  case REQUEST_USERINFO_SUCCESS:
    return action.data;

  case REQUEST_USERINFO_FAIL:
    return state;

  default:
    return state;
  }
}
