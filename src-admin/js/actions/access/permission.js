import * as types from '../../constants/ActionTypes';
import { fetchWithJson } from '../../utils/fetchUtils';
import { keyToCamel2, keyToSnake2 } from '../../utils/ChangeCaseUtils';
import {
  url_REQUEST_PERMISSIONS,
  url_REQUEST_PERMISSION_DEPENDENCY,
} from '../../../config/url';

function addAccessAlert(status, msg) {
  return {
    type: types.ADD_ACCESS_ALERT,
    status,
    msg
  };
}

function requestPermissions() {
  return {
    type: types.REQUEST_PERMISSIONS
  };
}

function requestPermissionsSuccess(permissions) {
  return {
    type: types.REQUEST_PERMISSIONS_SUCCESS,
    permissions
  };
}

function requestPermissionsFail() {
  return {
    type: types.REQUEST_PERMISSIONS_FAIL,
  };
}

export function fetchPermissions() {
  return (dispatch) => {
    dispatch(requestPermissions());
    fetchWithJson(url_REQUEST_PERMISSIONS)
      .then(response => response.json())
      .then(result => {
        if (!result.msg) {
          dispatch(requestPermissionsSuccess(
            result.map(permission => keyToCamel2(permission)))
          );
        }
        if (result.msg) {
          dispatch(requestPermissionsFail());
        }
      })
      .catch(ex => {
      });
  };
}

function requestPermissionDependencySuccess(dependency) {
  return {
    type: types.ADD_DEPENDENCY,
    dependency
  };
}

function requestPermissionDependencyFail() {
  return {
    type: types.REQUEST_PERMISSION_DEPENDENCY_FAIL,
  };
}

export function fetchPermissionDependency(id) {
  return (dispatch) => {
    fetchWithJson(url_REQUEST_PERMISSION_DEPENDENCY, {id})
      .then(response => response.json())
      .then(result => {
        if (!result.msg) {
          dispatch(requestPermissionDependencySuccess(
            result.map(d => keyToCamel2(d)))
          );
        }
        if (result.msg) {
          dispatch(requestPermissionDependencyFail());
        }
      })
      .catch(ex => {
      });
  };
}

function doAsyncAction(id, action) {
  return {
    type: types.DO_ROLE_ASYNC_ACTION,
    id,
    action
  };
}

function doneAsyncAction(id) {
  return {
    type: types.DONE_ROLE_ASYNC_ACTION,
    id
  };
}

function deletePermission(id) {
  return (dispatch, getState) => {
    dispatch(doAsyncAction(id, 'delete'));
    fetchWithJson(url_DELETE_ROLE, {id: id})
      .then(response => response.json())
      .then(result => {
        dispatch(doneAsyncAction(id));
        if (!result.msg) {
          dispatch(requestPermissionsSuccess(result.map(role => keyToCamel2(role))));
          dispatch(addAccessAlert('success', 'alert.access.role.deleteSuccess'));
        }
        if (result.msg) {
          dispatch(addAccessAlert('warning', result.msg));
        }
      })
      .catch(ex => {
        dispatch(doneAsyncAction(id));
        dispatch(addAccessAlert('danger', 'server.faildToAccess'));
      });
  };
}