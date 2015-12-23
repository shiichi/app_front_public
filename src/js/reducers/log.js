import {
  REQUEST_LOG,
  REQUEST_LOG_SUCCESS,
  REQUEST_LOG_FAIL
} from '../constants/ActionTypes';

const initialState = [];

export default function log(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOG:
      return state;

    case REQUEST_LOG_SUCCESS:
      return action.data;

    case REQUEST_LOG_FAIL:
      return state;

    default:
      return state;
  }
}