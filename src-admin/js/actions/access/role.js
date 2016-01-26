import * as types from '../../constants/ActionTypes';
import { fetchWithJson } from '../../utils/fetchUtils';
import { keyToCamel2, keyToSnake2 } from '../../utils/ChangeCaseUtils';
import {
  url_REQUEST_ROLES,
  url_DELETE_ROLE,
} from '../../../config/url';

function addAccessAlert(status, msg) {
  return {
    type: types.ADD_ACCESS_ALERT,
    status,
    msg
  };
}

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
    fetchWithJson(url_REQUEST_ROLES)
      .then(response => response.json())
      .then(result => {
        if (!result.msg) {
          dispatch(requestRolesSuccess(result.map(role => keyToCamel2(role))));
        }
        if (result.msg) {
          dispatch(requestRolesFail());
        }
      })
      .catch(ex => {
      });
  };
}

function doRoleAsyncAction(id, action) {
  return {
    type: types.DO_ROLE_ASYNC_ACTION,
    id,
    action
  };
}

function doneRoleAsyncAction(id) {
  return {
    type: types.DONE_ROLE_ASYNC_ACTION,
    id
  };
}

export function deleteRole(id) {
  return (dispatch, getState) => {
    dispatch(doRoleAsyncAction(id, 'delete'));
    fetchWithJson(url_DELETE_ROLE, {id: id})
      .then(response => response.json())
      .then(result => {
        dispatch(doneRoleAsyncAction(id));
        if (!result.msg) {
          dispatch(requestRolesSuccess(result.map(role => keyToCamel2(role))));
          dispatch(addAccessAlert('success', 'alert.access.role.deleteSuccess'));
        }
        if (result.msg) {
          dispatch(addAccessAlert('warning', result.msg));
        }
      })
      .catch(ex => {
        dispatch(doneRoleAsyncAction(id));
        dispatch(addAccessAlert('danger', 'server.faildToAccess'));
      });
  };
}