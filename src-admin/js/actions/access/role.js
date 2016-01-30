import * as types from '../../constants/ActionTypes';
import { customFetch } from '../../utils/fetchUtils';
import { keyToCamel, keyToSnake } from '../../utils/ChangeCaseUtils';

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
    customFetch('access/roles/fetch', 'GET')
    .then(result => {
      dispatch(requestRolesSuccess(result.map(role => keyToCamel(role))));
    })
    .catch(ex => {
      dispatch(requestRolesFail());
      dispatch(addAccessAlert('danger', 'server.' + ex.status));
    })
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

export function createRole(request) {
  return (dispatch) => {
    fetchWithJson(url_CREATE_ROLE, keyToSnake(request))
      .then(response => response.json())
      .then(result => {
        if (result === 'success') {
          dispatch(addAccessAlert('success', 'alert.access.users.storeSuccess'));
        }
        if (result.msg) {
          dispatch(addAccessAlert('warning', result.msg));
        }
        if (result.email) {
          dispatch(addAccessAlert('warning', 'validation.someError'));
          dispatch(addValidationAlert('validation.email.alreadyExists'));
        }
      })
      .catch(ex => {
        dispatch(addAccessAlert('danger', 'server.faildToAccess'));
      });
  };
}