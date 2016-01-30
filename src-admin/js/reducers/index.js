import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import { routeReducer } from 'react-router-redux'
//my reducers
import pageStatus from './pageStatus';
import myProfile from './myProfile';
import alert from './alert';
import disposable from './disposable';
import users from './users';
import roles from './roles';
import permissions from './permissions';
import editUser from './editUser';
import dependency from './dependency';

//reducers/index.jsから全てのreducerを取得しformReducer,routeReducerとcombine
const rootReducer = combineReducers(Object.assign({
    pageStatus, myProfile, alert, disposable,
    users, roles, permissions, editUser, dependency
  }, {
    form: formReducer,
    routing: routeReducer
  }
));

export default rootReducer
