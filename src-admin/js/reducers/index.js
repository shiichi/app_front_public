import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import { routeReducer } from 'redux-simple-router';
//reducers
import lang from './lang';
import myProfile from './myProfile';
import pageStatus from './pageStatus';
import alert from './alert';
import users from './users';
import roles from './roles';
import validationError from './validationError';
import address from './address';
import editUser from './editUser';

// import timetables from './timetables';
// import selector from './selector';
// import message from './message';
// import modal from './modal';
// import reservation from './reservation';
// import logs from './logs';
// import jwtToken from './jwtToken';

//reducers/index.jsから全てのreducerを取得しformReducer,routeReducerとcombine
const rootReducer = combineReducers(Object.assign({
    lang, myProfile, pageStatus, alert, users, roles, validationError, address, editUser
  }, {
    form: formReducer,
    routing: routeReducer
  }
));

export default rootReducer
