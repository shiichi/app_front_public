import expect from 'expect';
import { applyMiddleware } from 'redux';
import * as actions from '../../src/js/actions/timetable';
import * as types from '../../src/js/constants/ActionTypes';
import nock from 'nock';
import thunk from 'redux-thunk';
import promiseMiddleware from '../../src/js/middleware/promiseMiddleware';
const middlewares = [ thunk, promiseMiddleware ];

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