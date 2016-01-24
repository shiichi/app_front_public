import * as types from '../../constants/ActionTypes';
import { fetchWithJson } from '../../utils/fetchUtils';
import {
  url_ALL_ROLES,
} from '../../../config/url';

function requestRoles() {
  return {
    type: types.REQUEST_ROLES
  };
}

function requestRolesSuccess(roles) {
  return {
    type: types.REQUEST_ROLES_SUCCESS,
    roles
  };
}

function requestRolesFail(messages) {
  return {
    type: types.REQUEST_ROLES_FAIL,
  };
}

export function fetchRoles() {
  return (dispatch) => {
    dispatch(requestRoles());
    fetchWithJson(url_ALL_ROLES)
      .then(response => response.json())
      .then(result => {
        if (!result.msg) {
          dispatch(requestRolesSuccess(result));
        }
        if (result.msg) {
          dispatch(requestRolesFail());
        }
      })
      .catch(ex => {
      });
  };
}