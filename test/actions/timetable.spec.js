import expect from 'expect';
import * as types from '../../src/js/constants/ActionTypes';
import * as actions from '../../src/js/actions/timetable';

describe('timetable actions', () => {
  it('changeWeek should create CHANGE_WEEK action', () => {
    expect(actions.changeWeek(1)).toEqual({
      type: types.CHANGE_WEEK,
      week: 1
    });
  });

  it('setTypeStatus should create SET_TYPE_STATUS action', () => {
    const status = {};
    expect(actions.setTypeStatus(status)).toEqual({
      type: types.SET_TYPE_STATUS,
      status: status
    });
  });

  it('changeTypeChecked should create CHANGE_TYPE_CHECKED action', () => {
    expect(actions.changeTypeChecked(1)).toEqual({
      type: types.CHANGE_TYPE_CHECKED,
      id: 1
    });
  });

  it('setPlaceStatus should create SET_PLACE_STATUS action', () => {
    const status = {};
    expect(actions.setPlaceStatus(status)).toEqual({
      type: types.SET_PLACE_STATUS,
      status: status
    });
  });

  it('changePlaceActive should create CHANGE_PLACE_ACTIVE action', () => {
    const ids = [];
    expect(actions.changePlaceActive(ids)).toEqual({
      type: types.CHANGE_PLACE_ACTIVE,
      ids: ids
    });
  });

  it('changePlaceChecked should create CHANGE_PLACE_CHECKED action', () => {
    expect(actions.changePlaceChecked(1)).toEqual({
      type: types.CHANGE_PLACE_CHECKED,
      id: 1
    });
  });
});
