import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import { routeReducer } from 'react-router-redux'
//my reducers
import lang from './lang';
import myProfile from './myProfile';
import pageStatus from './pageStatus';
import alert from './alert';
import users from './users';
import roles from './roles';
import permissions from './permissions';
import validationError from './validationError';
import address from './address';
import editUser from './editUser';

//reducers/index.jsから全てのreducerを取得しformReducer,routeReducerとcombine
const rootReducer = combineReducers(Object.assign({
    lang, myProfile, pageStatus, alert, users, roles, permissions,
    validationError, address, editUser
  }, {
    form: formReducer,
    routing: routeReducer
  }
));

export default rootReducer
