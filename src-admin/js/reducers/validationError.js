import {
  ADD_VARIDATION_ALERT,
  CLEAR_VARIDATION_ALERT,
} from '../constants/ActionTypes';

export default function validationError(state = null, action) {
  switch (action.type) {
  case ADD_VARIDATION_ALERT:
    return action.msg;

  case CLEAR_VARIDATION_ALERT:
    return null;

  default:
    return state;
  }
}
