import { _ADMIN_DOMAIN_NAME } from '../../../config/env';
import * as types from '../../constants/ActionTypes';
import { customFetch } from '../../utils/fetchUtils';
import { keyToCamel } from '../../utils/ChangeCaseUtils';
//import {} from '../../../config/url';

export function addSideAlert(status, messageId, value) {
  return {
    type: types.ADD_SIDE_ALERT,
    status,
    messageId,
    value
  };
}

function doAsyncAction(id, action) {
  return {
    type: types.DO_ASYNC_ACTION,
    id,
    action
  };
}

function doneAsyncAction(id) {
  return {
    type: types.DONE_ASYNC_ACTION,
    id
  };
}

function requestUsers() {
  return {
    type: types.REQUEST_USERS,
  };
}

function requestUsersSuccess(total, users) {
  return {
    type: types.REQUEST_USERS_SUCCESS,
    total,
    users
  };
}

function requestUsersFail() {
  return {
    type: types.REQUEST_USERS_FAIL,
  };
}

export function fetchUsers() {
  return (dispatch, getState) => {
    const url = 'access/users/fetch' + getState().routing.location.search;
    dispatch(requestUsers());
    customFetch(url, 'GET')
    .then(result => {
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(requestUsersFail());
      dispatch(addSideAlert('danger', 'server.' + ex.status));
    })
  };
}

function requestUser() {
  return {
    type: types.REQUEST_USER,
  };
}

function requestUserSuccess(user) {
  return {
    type: types.REQUEST_USER_SUCCESS,
    user
  };
}

function requestUserFail() {
  return {
    type: types.REQUEST_USER_FAIL,
  };
}

export function fetchUser(id) {
  return (dispatch, getState) => {
    dispatch(requestUser());
    customFetch(`access/users/${id}/fetch`, 'GET')
    .then(result => {
      dispatch(requestUserSuccess(keyToCamel(result)));
    })
    .catch(ex => {
      dispatch(requestUserFail());
      dispatch(addSideAlert('danger', 'server.' + ex.status));
    })
  };
}

export function storeUser(body) {
  return (dispatch) => {
    customFetch(`access/users`, 'POST', body)
    .then(result => {
      dispatch(addSideAlert(
        'success',
        'sideAlert.success',
        { attribute: 'user', method: 'store' }));
    })
    .catch(ex => {
      dispatch(addSideAlert('danger', 'server.' + ex.status));
    })
  }
}

export function updateUser(id, body) {
  return (dispatch) => {
    customFetch(`access/users/${id}`, 'PUT', body)
    .then(result => {
      dispatch(addSideAlert(
        'success',
        'sideAlert.success',
        { attribute: 'user', method: 'update' }));
      })
    .catch(ex => {
      dispatch(addSideAlert('danger', 'server.' + ex.status));
    })
  }
}

export function activateUser(id) {
  return (dispatch, getState) => {
    const { query } = getState().routing.location;
    dispatch(doAsyncAction(id, 'activate'));
    customFetch(`access/users/${id}/activate`, 'PATCH', query)
    .then(result => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert(
        'success',
        'sideAlert.success',
        { attribute: 'user', method: 'activate' }));
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert('danger', 'server.' + ex.status));
    })
  };
}

export function deactivateUser(id) {
  return (dispatch, getState) => {
    const { query } = getState().routing.location;
    dispatch(doAsyncAction(id, 'deactivate'));
    customFetch(`access/users/${id}/deactivate`, 'PATCH', query)
    .then(result => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert(
        'success',
        'sideAlert.success',
        { attribute: 'user', method: 'deactivate' }));
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert('danger', 'server.' + ex.status));
    })
  };
}

export function restoreUser(id, activePage, perpage) {
  return (dispatch, getState) => {
    const { query } = getState().routing.location;
    dispatch(doAsyncAction(id, 'restore'));
    customFetch(`access/users/${id}/restore`, 'PATCH', query)
    .then(result => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert(
        'success',
        'sideAlert.success',
        { attribute: 'user', method: 'restore' }));
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert('danger', 'server.' + ex.status));
    })
  };
}

export function destroyUser(id) {
  return (dispatch, getState) => {
    const { query } = getState().routing.location;
    dispatch(doAsyncAction(id, 'destroy'));
    customFetch(`access/users/${id}`, 'DELETE', query)
    .then(result => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert(
        'success',
        'sideAlert.success',
        { attribute: 'user', method: 'destroy' }));
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert('danger', 'server.' + ex.status));
    })
  };
}

export function deleteUser(id) {
  return (dispatch, getState) => {
    const { query } = getState().routing.location;
    dispatch(doAsyncAction(id, 'delete'));
    customFetch(`access/users/${id}/hard`, 'DELETE', query)
    .then(result => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert(
        'success',
        'sideAlert.success',
        { attribute: 'user', method: 'delete' }));
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert('danger', 'server.' + ex.status));
    })
  };
}

export function changePassword(body) {
  return (dispatch) => {
    customFetch('access/users/{id}/password/change', 'POST', body)
    .then(result => {
      dispatch(addSideAlert(
        'success',
        'sideAlert.success',
        { attribute: 'user', method: 'changePassword' }));
    })
    .catch(ex => {
      dispatch(addSideAlert('danger', 'server.' + ex.status));
    })
  }
}

function addValidation(validation) {
  return {
    type: types.ADD_VALIDATION,
    validation
  };
}

function addAddress(address) {
  return {
    type: types.ADD_ADDRESS,
    address
  };
}

export function fetchAddress(code) {
  return (dispatch) => {
    customFetch(`getAddress/${code.slice(0,3)}/${code.slice(3,7)}`, 'GET')
    .then(result => {
      dispatch(addAddress(result));
    })
    .catch(ex => {
      dispatch(addValidation({
        postalCode: {
          value: code,
          status: 'error',
          message: 'validation.postalCode.notValid'
        }
      }));
    })
  }
}

export function validateEmail(email) {
  return (dispatch) => {
    customFetch('validation/user', 'POST', {email})
    .then(result => {
      if (result !== 'ok') {
        dispatch(addValidation({
          email: {
            value: email,
            status: 'error',
            message: 'validation.email.alreadyExists'
          }
        }));
      };
    })
    .catch(ex => {
      dispatch(requestUsersFail());
    })
  }
}
