import {
  REQUEST_RESERVATIONS,
  REQUEST_RESERVATIONS_SUCCESS,
  REQUEST_RESERVATIONS_FAIL
} from '../constants/ActionTypes';

const initialState = {
  data: [],
  isFetching: false,
  didInvalidate: false
};

export default function reservation(state = initialState, action) {
  switch (action.type) {
  case REQUEST_RESERVATIONS:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case REQUEST_RESERVATIONS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      data: action.data
    });

  case REQUEST_RESERVATIONS_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });
  default:
    return state;
  }
}
