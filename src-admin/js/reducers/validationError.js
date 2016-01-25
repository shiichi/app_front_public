import {
  ADD_VALIDATION_ALERT,
  CLEAR_VALIDATION_ALERT,
} from '../constants/ActionTypes';

export default function validationError(state = null, action) {
  switch (action.type) {
  case ADD_VALIDATION_ALERT:
    return action.msg;

  case CLEAR_VALIDATION_ALERT:
    return null;

  default:
    return state;
  }
}
