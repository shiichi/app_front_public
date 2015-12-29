import expect from 'expect';
import * as types from '../../src/js/constants/ActionTypes';
import * as actions from '../../src/js/actions/message';

describe('message actions', () => {
  it('deleteMessage should create DELETE_MESSAGE action', () => {
    expect(actions.deleteMessage('1')).toEqual({
      type: types.DELETE_MESSAGE,
      id: '1'
    });
  });

  it('clearMessage should create CLEAR_MESSAGE action', () => {
    expect(actions.clearMessage()).toEqual({
      type: types.CLEAR_MESSAGE
    });
  });
});