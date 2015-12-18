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
    timetable: {},
    selector: {
      flightTypes: [
        {id: 1, name: '自由操縦', en: 'free', checked: true},
        {id: 2, name: 'プログラミング', en: 'program', checked: false},
        {id: 3, name: 'ゲーム', en: 'game', checked: false}
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
    afterEach(() => {
      nock.cleanAll();
    });

    it('should render SelectBox wrap correctly', () => {
      nock('http://l.com/')
        .post('/api/timetable')
        .reply(200, {
          selector: {},
          timetable: {key: '1_1_0', data: {}}
        });

      const { output, state, renderer } = setup({}, {
        timetable: {
          '1_1_0': {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: '12345678',
            data: 'data'
          }
        }
      });

      renderer.componentDidMount();
      expect(output).toBe(state.selector);

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
