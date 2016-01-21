import {
  REQUEST_USERINFO,
  REQUEST_USERINFO_SUCCESS,
  REQUEST_USERINFO_FAIL,
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
  },
  isFetching: false,
  didInvalidate: false
};

export default function myProfile(state = initialState, action) {
  switch (action.type) {
  case REQUEST_USERINFO:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case REQUEST_USERINFO_SUCCESS:
    return Object.assign({}, state, action.data, {
      isFetching: false,
      didInvalidate: false
    });

  case REQUEST_USERINFO_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });

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
