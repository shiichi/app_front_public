import * as types from '../constants/ActionTypes';
import { fetchWithJson } from '../utils/fetchUtils';
import { keyToCamel, keyToSnake } from '../utils/ChangeCaseUtils';
import {
  url_REQUEST_MY_PROFILE,
} from '../../config/url';

function requestMyProfile() {
  return {
    type: types.REQUEST_MY_PROFILE
  };
}

export function requestMyProfileSuccess(profile) {
  return {
    type: types.REQUEST_MY_PROFILE_SUCCESS,
    profile
  };
}

export function requestMyProfileFail() {
  return {
    type: types.REQUEST_MY_PROFILE_FAIL
  };
}

export function fetchMyProfile() {
  return dispatch => {
    dispatch(requestMyProfile());
    fetchWithJson(url_REQUEST_MY_PROFILE)
    .then(response => response.json())
    .then(result => dispatch(requestMyProfileSuccess(keyToCamel(result))))
    .catch(ex => dispatch(requestMyProfileFail()));
  };
}

