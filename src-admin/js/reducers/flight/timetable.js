import {
  REQUEST_TIMETABLE,
  REQUEST_TIMETABLE_SUCCESS,
  REQUEST_TIMETABLE_FAIL,
} from '../../constants/ActionTypes';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  key: null,
  timetable: null
};

export default function timetable(state = initialState, action) {
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
      key: action.key,
      timetable: action.timetable,
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
