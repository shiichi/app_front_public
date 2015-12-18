import {
  REQUEST_TIMETABLE,
  REQUEST_TIMETABLE_SUCCESS,
  REQUEST_TIMETABLE_FAIL,
} from '../constants/ActionTypes';

function change(state = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: '',
  data: {},
}, action) {
  switch (action.type) {
  case REQUEST_TIMETABLE:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case REQUEST_TIMETABLE_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      data: action.data,
      lastUpdated: action.receivedAt
    });

  case REQUEST_TIMETABLE_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });

  default:
    return state;
  }
}

export default function timetable(state = {}, action) {
  switch (action.type) {
  case REQUEST_TIMETABLE:
  case REQUEST_TIMETABLE_SUCCESS:
  case REQUEST_TIMETABLE_FAIL:
    return Object.assign({}, state, {
      [action.key]: change(state[action.key], action)
    });

  default:
    return state;
  }
}
