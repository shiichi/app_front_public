import {
  SET_RESERVATION,
} from '../constants/ActionTypes';

const initialState = [];

export default function reservation(state = initialState, action) {
  switch (action.type) {
  case SET_RESERVATION:
    return action.rsvs;

  default:
    return state;
  }
}
