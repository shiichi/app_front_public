import {
  REQUEST_USERINFO,
  REQUEST_USERINFO_SUCCESS,
  REQUEST_USERINFO_FAIL,
  REQUEST_USERPROF,
  REQUEST_USERPROF_SUCCESS,
  REQUEST_USERPROF_FAIL,
  UPDATE_USERINFO_TICKETS,
  UPDATE_USERINFO_RESERVATION
} from '../constants/ActionTypes';

const initialState = {
  name: '',
  age: '',
  sex: '',
  address: '',
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

    case REQUEST_USERPROF:
      return state;

    case REQUEST_USERPROF_SUCCESS:
      return Object.assign({}, state, action.data);

    case REQUEST_USERPROF_FAIL:
      return state;

    case UPDATE_USERINFO_TICKETS:
      return Object.assign({}, state, {
        status:{
          reservations: state.status.reservations,
          remainingTickets: action.num
        }});

    case UPDATE_USERINFO_RESERVATION:
      return Object.assign({}, state, {
        status:{
          reservations: action.num,
          remainingTickets: state.status.remainingTickets
        }});

    default:
    return state;
  }
}
