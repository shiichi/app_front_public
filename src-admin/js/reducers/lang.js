import { _LANG } from '../../config/env';
import {
  CANGE_LANG
} from '../constants/ActionTypes';

export default function lang(state = _LANG, action) {
  switch (action.type) {
  case CANGE_LANG:
    return action.lang;

  default:
    return state;
  }
}
