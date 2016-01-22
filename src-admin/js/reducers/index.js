import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import { routeReducer } from 'redux-simple-router';
//reducers
import lang from './lang';
import myProfile from './myProfile';
import pageStatus from './pageStatus';
import alert from './alert';
import users from './users';

// import timetables from './timetables';
// import selector from './selector';
// import message from './message';
// import modal from './modal';
// import reservation from './reservation';
// import logs from './logs';
// import jwtToken from './jwtToken';

//reducers/index.jsから全てのreducerを取得しformReducer,routeReducerとcombine
const rootReducer = combineReducers(Object.assign({
    lang, myProfile, pageStatus, alert, users,
  }, {
    form: formReducer,
    routing: routeReducer
  }
));

export default rootReducer
