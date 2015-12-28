import expect from 'expect';
import { applyMiddleware } from 'redux';
import * as actions from '../../src/js/actions/timetable';
import * as types from '../../src/js/constants/ActionTypes';
import nock from 'nock';
import thunk from 'redux-thunk';
const middlewares = [ thunk ];

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

  it('should fetch and fetch SUCCESS', (done) => {
    nock('http://l.com/')
      .post('/api/getTimetable')
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

  it('should fetch and fetch FAIL', (done) => {
    nock('http://l.com/')
        .post('/api/timetable')
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
