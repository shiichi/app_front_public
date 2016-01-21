import {
  CANGE_LANG
} from '../constants/ActionTypes';

export default function lang(state = 'en', action) {
  switch (action.type) {
  case CANGE_LANG:
    return action.lang;

  default:
    return state;
  }
}
