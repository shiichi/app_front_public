import * as types from '../../constants/ActionTypes';
import { fetchWithJson } from '../../utils/fetchUtils';
import { keyToCamel, keyToSnake } from '../../utils/ChangeCaseUtils';
import {
  url_REQUEST_USERS,
  url_REQUEST_USER,
  url_MARK_USER,
  url_DELETE_USER,
  url_RESTORE_USER,
  url_PERMANENTLY_DELETE_USER,
  url_CREATE_USERS,
  url_GET_ADDRESS,
  url_CHANGE_PASSWORD,
  url_UPDATE_USER
} from '../../../config/url';

export function addAccessAlert(status, msg) {
  return {
    type: types.ADD_ACCESS_ALERT,
    status,
    msg
  };
}

function addValidationAlert(msg) {
  return {
    type: types.ADD_VALIDATION_ALERT,
    msg
  };
}

function getFilterFromPath(path) {
  const p = path.split('?')['0'];
  let filter = '';

  if (p === '/access/users' || p === '/access/users/') {
    filter = 'all';
  } else if (p === '/access/users/active' || p === '/access/users/active/') {
    filter = '1';
  } else if (p === '/access/users/deactivated' || p === '/access/users/deactivated/') {
    filter = '0';
  } else if (p === '/access/users/deleted' || p === '/access/users/deleted/') {
    filter = 'deleted';
  }

  return filter;
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

export function fetchUsers(activePage, perpage) {
  return (dispatch, getState) => {
    dispatch(requestUsers());
    fetchWithJson(url_REQUEST_USERS, {
      filter: getFilterFromPath(getState().routing.path),
      skip: (activePage - 1) * perpage,
      take: perpage
    })
      .then(response => response.json())
      .then(result => {
        if (!result.msg) {
          dispatch(requestUsersSuccess(
            result.total,
            result.users.map(user => keyToCamel(user))
          ));
        }
        if (result.msg) {
          dispatch(requestUsersFail());
          dispatch(addAccessAlert('warning', result.msg));
        }
      })
      .catch(ex => {
        dispatch(requestUsersFail());
        dispatch(addAccessAlert('danger', 'server.faildToAccess'));
      });
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
    fetchWithJson(url_REQUEST_USER, id)
      .then(response => response.json())
      .then(result => {
        if (!result.msg) {
          dispatch(requestUserSuccess(keyToCamel(result)));
        }
        if (result.msg) {
          dispatch(requestUserFail());
          dispatch(addAccessAlert('warning', result.msg));
        }
      })
      .catch(ex => {
        dispatch(requestUserFail());
        dispatch(addAccessAlert('danger', 'server.faildToAccess'));
      });
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

export function deactivateUser(id, activePage, perpage) {
  return (dispatch, getState) => {
    dispatch(doAsyncAction(id, 'deactivate'));
    fetchWithJson(url_MARK_USER, {
      id,
      status: '0',
      filter: getFilterFromPath(getState().routing.path),
      skip: (activePage - 1) * perpage,
      take: perpage,
    })
      .then(response => response.json())
      .then(result => {
        dispatch(doneAsyncAction(id));
        if (!result.msg) {
          dispatch(requestUsersSuccess(result.total, result.users));
          dispatch(addAccessAlert('success', 'alert.access.users.deactivateSuccess'));
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

export function activateUser(id, activePage, perpage) {
  return (dispatch, getState) => {
    dispatch(doAsyncAction(id, 'activate'));
    fetchWithJson(url_MARK_USER, {
      id,
      status: '1',
      filter: getFilterFromPath(getState().routing.path),
      skip: (activePage - 1) * perpage,
      take: perpage,
    })
      .then(response => response.json())
      .then(result => {
        dispatch(doneAsyncAction(id));
        if (!result.msg) {
          dispatch(requestUsersSuccess(result.total, result.users));
          dispatch(addAccessAlert('success', 'alert.access.users.activateSuccess'));
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

export function deleteUser(id, activePage, perpage) {
  return (dispatch, getState) => {
    dispatch(doAsyncAction(id, 'delete'));
    fetchWithJson(url_DELETE_USER, {
      id,
      filter: getFilterFromPath(getState().routing.path),
      skip: (activePage - 1) * perpage,
      take: perpage,
    })
      .then(response => response.json())
      .then(result => {
        dispatch(doneAsyncAction(id));
        if (!result.msg) {
          dispatch(requestUsersSuccess(result.total, result.users));
          dispatch(addAccessAlert('success', 'alert.access.users.deleteSuccess'));
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

export function restoreUser(id, activePage, perpage) {
  return (dispatch, getState) => {
    dispatch(doAsyncAction(id, 'restore'));
    fetchWithJson(url_RESTORE_USER, {
      id,
      filter: 'deleted',
      skip: (activePage - 1) * perpage,
      take: perpage,
    })
      .then(response => response.json())
      .then(result => {
        dispatch(doneAsyncAction(id));
        if (!result.msg) {
          dispatch(requestUsersSuccess(result.total, result.users));
          dispatch(addAccessAlert('success', 'alert.access.users.restoreSuccess'));
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

export function permanentlyDeleteUser(id, activePage, perpage) {
  return (dispatch, getState) => {
    dispatch(doAsyncAction(id, 'permanentlyDelete'));
    fetchWithJson(url_PERMANENTLY_DELETE_USER, {
      id,
      filter: getFilterFromPath(getState().routing.path),
      skip: (activePage - 1) * perpage,
      take: perpage,
    })
      .then(response => response.json())
      .then(result => {
        dispatch(doneAsyncAction(id));
        if (!result.msg) {
          dispatch(requestUsersSuccess(result.total, result.users));
          dispatch(addAccessAlert('success', 'alert.access.users.permanentlyDeleteSuccess'));
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

//用修正

function requestCreateUsers() {
  return {
    type: types.REQUEST_CREATE_USERS,
  };
}

function createUsersSuccess() {
  return {
    type: types.CREATE_USERS_SUCCESS,
  };
}

function createUsersFail() {
  return {
    type: types.CREATE_USERS_FAIL,
  };
}

export function createUser(request) {
  return (dispatch) => {
    dispatch(requestCreateUsers());
    fetchWithJson(url_CREATE_USERS, keyToSnake(request))
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


function addAddress(address) {
  return {
    type: types.ADD_ADDRESS,
    address
  };
}

function dividePostalCode(code) {
  return {
    post1: code.slice(0, 3),
    post2: code.slice(3, 7)
  };
}

export function fetchAddress(code) {
  return (dispatch) => {
    fetchWithJson(url_GET_ADDRESS, dividePostalCode(code))
      .then(response => response.json())
      .then(result => dispatch(addAddress(result)))
      .catch(ex => dispatch(addAccessAlert('danger', 'server.faildToAccess')));
  }
}

export function changePassword(request) {
  return (dispatch) => {
    fetchWithJson(url_CHANGE_PASSWORD, keyToSnake(request))
      .then(response => response.json())
      .then(result => {
        if (result === 'success') {
          dispatch(addAccessAlert('success', 'alert.access.users.changePasswordSuccess'));
        } else if (result.msg) {
          dispatch(addAccessAlert('warning', result.msg));
        } else {
          dispatch(addAccessAlert('warning', 'validation.someError'));
          dispatch(addValidationAlert('validation.email.alreadyExists'));
        }
      })
      .catch(ex => dispatch(addAccessAlert('danger', 'server.faildToAccess')));
  }
}



export function updateUser(request) {
  return (dispatch) => {
    fetchWithJson(url_UPDATE_USER, keyToSnake(request))
      .then(response => response.json())
      .then(result => {
        if (result === 'success') {
          dispatch(addAccessAlert('success', 'alert.access.users.updatedSuccess'));
        } else if (result.msg) {
          dispatch(addAccessAlert('warning', result.msg));
        } else {
          dispatch(addAccessAlert('warning', 'validation.someError'));
        }
      })
      .catch(ex => dispatch(addAccessAlert('danger', 'server.faildToAccess')));
  }
}