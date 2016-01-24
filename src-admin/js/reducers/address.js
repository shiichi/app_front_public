import {
  ADD_ADDRESS,
  CLEAR_ADDRESS,
} from '../constants/ActionTypes';

export default function address(state = {}, action) {
  switch (action.type) {
  case ADD_ADDRESS:
    return action.address;

  case CLEAR_ADDRESS:
    return {};

  default:
    return state;
  }
}
