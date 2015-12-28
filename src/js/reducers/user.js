import {
  REQUEST_USERINFO,
  REQUEST_USERINFO_SUCCESS,
  REQUEST_USERINFO_FAIL,
  UPDATE_USERPROF,
  UPDATE_USERPROF_SUCCESS,
  UPDATE_USERPROF_FAIL,
  UPDATE_USERINFO_TICKETS,
  UPDATE_USERINFO_RESERVATION
} from '../constants/ActionTypes';

const initialState = {
  name: '',
  first_name: '',
  last_name: '',
  age: '',
  sex: '',
  postal_code: '',
  state: '',
  city: '',
  street: '',
  building: '',
  auth: [],
  status: {
    reservations: '',
    remainingTickets: ''
  }
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case REQUEST_USERINFO:
    return state;

  case REQUEST_USERINFO_SUCCESS:
    return Object.assign({}, state, action.data);

  case REQUEST_USERINFO_FAIL:
    return state;

  case UPDATE_USERPROF:
    return state;

  case UPDATE_USERPROF_SUCCESS:
    return Object.assign({}, state, action.data);

  case UPDATE_USERPROF_FAIL:
    return state;

  case UPDATE_USERINFO_TICKETS:
    return Object.assign({}, state, {
      status: {
          reservations: state.status.reservations,
          remainingTickets: action.num
        }});

  case UPDATE_USERINFO_RESERVATION:
    return Object.assign({}, state, {
      status: {
          reservations: action.num,
          remainingTickets: state.status.remainingTickets
        }});

  default:
    return state;
  }
}
