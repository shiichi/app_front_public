import * as types from '../constants/ActionTypes';
import { customFetch } from '../utils/fetchUtils';
import { keyToCamel, keyToSnake } from '../utils/ChangeCaseUtils';

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
    customFetch('api/getUserInfo', 'GET')
    .then(result => {
      dispatch(requestMyProfileSuccess(keyToCamel(result)));
    })
    .catch(ex => {
      dispatch(requestMyProfileFail());
      dispatch(addAccessAlert('danger', 'server.' + ex.status));
    })
  }
}

