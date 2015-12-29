import expect from 'expect';
import { applyMiddleware } from 'redux';
import * as actions from '../../src/js/actions/timetable';
import * as types from '../../src/js/constants/ActionTypes';
import nock from 'nock';
import thunk from 'redux-thunk';
const middlewares = [ thunk ];
import { DOMAIN_NAME } from '../../src/config/env';
import { REQUEST_TIMETABLE, REQUEST_DEFAULT_STATUS } from '../../src/config/url';

function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();
        expect(action).toEqual(expectedAction);
        if (done && !expectedActions.length) {
          done();
        }
        return action;
      }
    };
  }
  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}

function mockStore2(getState, expectedAction) {
  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
            getState() :
            getState;
      },

      dispatch(action) {
        return action;
      }
    };
  }
  const mockStoreWithMiddleware = applyMiddleware(...middlewares)(mockStoreWithoutMiddleware);
  return mockStoreWithMiddleware();
}

describe('fetchTimetableIfNeeded', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch and return SUCCESS', (done) => {
    nock(DOMAIN_NAME)
      .post(REQUEST_TIMETABLE)
      .reply(200, ['date', 'timetable']);

    const key = '1_1_0';
    const request = { flightType: 1, place: 1, week: 0 };
    const state = {
      user: Object,
      timetable: {},
      selector: Object
    };
    const expectedActions = [
      { key: key,
        type: types.REQUEST_TIMETABLE
      },
      { type: types.REQUEST_TIMETABLE_SUCCESS,
        key: key,
        data: ['date', 'timetable']
        //receivedAt: Date.now()
      }
    ];
    const store = mockStore(state, expectedActions, done);
    store.dispatch(actions.fetchTimetableIfNeeded(key, request));
  });

  it('should fetch and return FAIL', (done) => {
    nock(DOMAIN_NAME)
        .post(REQUEST_TIMETABLE)
        .replyWithError('something happened');

    const key = '1_1_0';
    const request = { flightType: 1, place: 1, week: 0 };
    const state = {
      user: Object,
      timetable: {},
      selector: Object
    };
    const expectedActions = [
      { key: key,
        type: types.REQUEST_TIMETABLE
      },
      { type: types.REQUEST_TIMETABLE_FAIL,
        key: key
      }
    ];
    const store = mockStore(state, expectedActions, done);
    store.dispatch(actions.fetchTimetableIfNeeded(key, request));
  });

  it('need not fetch', () => {
    const key = '1_1_0';
    const request = { flightType: 1, place: 1, week: 0 };
    const state = {
      user: Object,
      timetable: {'1_1_0': Object},
      selector: Object
    };
    const expectedAction = undefined;
    const store = mockStore2(state, expectedAction);
    expect(store.dispatch(actions.fetchTimetableIfNeeded(key, request))).toEqual(expectedAction);
  });
});

describe('fetchDefaultStatus', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetch SUCCESS ver1', (done) => {
    const flightTypes = 'types';
    const places = 'places';
    const plans = [
      {type_id: '1', place_id: '1'},
      {type_id: '1', place_id: '2'},
      {type_id: '1', place_id: '3'},
      {type_id: '2', place_id: '1'},
      {type_id: '2', place_id: '2'},
      {type_id: '3', place_id: '1'},
      {type_id: '3', place_id: '3'}
    ];
    const key = '1_1_0';
    const data = 'data';

    nock(DOMAIN_NAME)
      .post(REQUEST_DEFAULT_STATUS)
      .reply(200, {selector: {types: flightTypes, places, plans}, timetable: {key, data}});

    const state = {user: {}};
    const expectedActions = [
      {
        type: types.SET_PLANS,
        plans
      }, {
        type: types.REQUEST_TIMETABLE_SUCCESS,
        key,
        data
      }, {
        type: types.SET_TYPE_STATUS,
        status: flightTypes
      }, {
        type: types.CHANGE_TYPE_CHECKED,
        id: 1
      }, {
        type: types.SET_PLACE_STATUS,
        status: places
      }, {
        type: types.CHANGE_PLACE_CHECKED,
        id: 1
      }
    ];
    const store = mockStore(state, expectedActions, done);
    store.dispatch(actions.fetchDefaultStatus());
  });

  it('fetch SUCCESS ver2', (done) => {
    const flightTypes = 'types';
    const places = 'places';
    const plans = [
      {type_id: '1', place_id: '2'},
      {type_id: '1', place_id: '3'},
      {type_id: '2', place_id: '1'},
      {type_id: '2', place_id: '2'},
      {type_id: '3', place_id: '1'},
      {type_id: '3', place_id: '3'}
    ];
    const key = '1_1_0';
    const data = 'data';

    nock(DOMAIN_NAME)
      .post(REQUEST_DEFAULT_STATUS)
      .reply(200, {selector: {types: flightTypes, places, plans}, timetable: {key, data}});

    const state = {user: {}};
    const expectedActions = [
      {
        type: types.SET_PLANS,
        plans
      }, {
        type: types.REQUEST_TIMETABLE_SUCCESS,
        key,
        data
      }, {
        type: types.SET_TYPE_STATUS,
        status: flightTypes
      }, {
        type: types.CHANGE_TYPE_CHECKED,
        id: 1
      }, {
        type: types.SET_PLACE_STATUS,
        status: places
      }, {
        type: types.CHANGE_PLACE_CHECKED,
        id: 2
      }
    ];
    const store = mockStore(state, expectedActions, done);
    store.dispatch(actions.fetchDefaultStatus());
  });

  it('fetch SUCCESS ver3', (done) => {
    const flightTypes = 'types';
    const places = 'places';
    const plans = [
      {type_id: '12', place_id: '5'},
      {type_id: '13', place_id: '6'},
      {type_id: '11', place_id: '7'},
      {type_id: '10', place_id: '9'},
      {type_id: '10', place_id: '7'},
      {type_id: '10', place_id: '8'}
    ];
    const key = '1_1_0';
    const data = 'data';

    nock(DOMAIN_NAME)
      .post(REQUEST_DEFAULT_STATUS)
      .reply(200, {selector: {types: flightTypes, places, plans}, timetable: {key, data}});

    const state = {user: {}};
    const expectedActions = [
      {
        type: types.SET_PLANS,
        plans
      }, {
        type: types.REQUEST_TIMETABLE_SUCCESS,
        key,
        data
      }, {
        type: types.SET_TYPE_STATUS,
        status: flightTypes
      }, {
        type: types.CHANGE_TYPE_CHECKED,
        id: 10
      }, {
        type: types.SET_PLACE_STATUS,
        status: places
      }, {
        type: types.CHANGE_PLACE_CHECKED,
        id: 7
      }
    ];
    const store = mockStore(state, expectedActions, done);
    store.dispatch(actions.fetchDefaultStatus());
  });
});
