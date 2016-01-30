import { _LANG } from '../../config/env';
import {
  CANGE_LANG,
  SIDEVAR_ON,
  SIDEVAR_OFF,
  CHANGE_SIDEVAR
} from '../constants/ActionTypes';

const initialState = {
  lang: _LANG,
  sidebar: true
};

export default function pageStatus(state = initialState, action) {
  switch (action.type) {
  case CANGE_LANG:
    return Object.assign({}, state, {
      lang: action.lang
    });

  case SIDEVAR_ON:
    return Object.assign({}, state, {
      sidebar: true
    });

  case SIDEVAR_OFF:
    return Object.assign({}, state, {
      sidebar: false
    });

  case CHANGE_SIDEVAR:
    return Object.assign({}, state, {
      sidebar: !state.sidebar
    });

  default:
    return state;
  }
}
