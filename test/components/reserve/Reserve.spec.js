import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import nock from 'nock';
import Reserve from '../../../src/js/components/Reserve/Reserve';

function setup(actionsOverrides, stateOverrides) {
  const actions = Object.assign({
    requestTimetableSuccess: expect.createSpy(),
    setPlaceStatus: expect.createSpy(),
    changePlaceChecked: expect.createSpy(),
    setTypeStatus: expect.createSpy(),
    changeTypeChecked: expect.createSpy()
  }, actionsOverrides);

  const state = Object.assign({
    selector: {
      flightTypes: [
        {id: 1, name: 'type1', en: 'en1', checked: true},
        {id: 2, name: 'type2', en: 'en2', checked: false},
        {id: 3, name: 'type3', en: 'en3', checked: false}
      ],
      places: [
        {id: 1, path: '/path1', active: true, checked: true},
        {id: 2, path: '/path2', active: true, checked: false},
        {id: 3, path: '/path3', active: false, checked: false},
        {id: 4, path: '/path4', active: false, checked: false}
      ],
      week: 0
    }
  }, stateOverrides);

  const store = {
    getState: function() {
      return state;
    },
    subscribe: function() {},
    dispatch: function() {},
  };


  const renderer = TestUtils.createRenderer();

  renderer.render(
    <Reserve store={store} actions={actions}/>
  );

  const output = renderer.getRenderOutput();

  return {
    actions: actions,
    state: state,
    output: output
  };
}

describe('components', () => {
  describe('Reserve', () => {
    it('should render SelectBox wrap correctly', () => {
      const { output, state, renderer } = setup({}, {
        modal: 'modal',
        plans: 'plans',
        timetables: {
          '1_1_0': {
            isFetching: false,
            didInvalidate: false,
            isOld: false,
            lastUpdated: '12345678',
            data: 'data'
          },
          plans:{}

        }
      });

      //renderer.componentDidMount();
      expect(output.props).toBe(state);

    });

    it('should render SelectBox wrap correctly', () => {
      const { output, state } = setup({}, {
        timetable: {
          '1_1_0': {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: '12345678',
            data: 'data'
          }
        }
      });

      expect(output.props.selector).toBe(state.selector);
      expect(output.props.isFetching).toEqual(false);
      expect(output.props.lastUpdated).toBe('12345678');
      expect(output.props.data).toBe('data');
    });

    it('should render SelectBox wrap correctly', () => {
      const { output, state } = setup({}, {
        timetable: {
          '1_1_1': {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: '12345678',
            data: 'data'
          }
        }
      });

      expect(output.props.selector).toBe(state.selector);
      expect(output.props.isFetching).toEqual(true);
      expect(output.props.lastUpdated).toBe(undefined);
      expect(output.props.data).toBe(undefined);
    });
  });
});
