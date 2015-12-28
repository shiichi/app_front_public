import expect from 'expect';
import { applyMiddleware } from 'redux';
import * as actions from '../../src/js/actions/reservation';
import * as types from '../../src/js/constants/ActionTypes';
import nock from 'nock';
import thunk from 'redux-thunk';
const middlewares = [ thunk ];

function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.')
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.')
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState;
      },
      dispatch(action) {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        if (done && !expectedActions.length) {
          done()
        }
        return action
      }
    }
  }
  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware)

  return mockStoreWithMiddleware()
}

describe('fetchTestToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  function storageMock() {
    var storage = {};

    return {
      setItem: function(key, value) {
        storage[key] = value || '';
      },
      getItem: function(key) {
        return storage[key] || null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i) {
        var keys = Object.keys(storage);
        return keys[i] || null;
      }
    };
  }

  Object.defineProperty(window, 'localStorage', { value: storageMock });

  it('return success', (done) => {
    nock('http://l.com/')
      .post('/api/getTestToken')
      .reply(200, {jwt: 'jwt', msg: {type: "success", msg: "msg"}});

    const request = {id: "123"};
    const state = {
      user: Object
    };
    const expectedActions = [
      {
        type: types.MODAL_ON
      }
    ];
    const store = mockStore(state, expectedActions, done);
    store.dispatch(actions.fetchTestToken(request));
  });
});