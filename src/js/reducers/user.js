import {
  GET_USERINFO,
  GET_USERINFO_SUCCESS,
  GET_USERINFO_FAIL,
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

  case GET_USERINFO:
    return state;

  case GET_USERINFO_SUCCESS:
    return action.data;

  case GET_USERINFO_FAIL:
    return state;

  default:
    return state;
  }
}
