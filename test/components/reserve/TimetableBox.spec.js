import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TimetableBox from '../../../src/js/components/Reserve/TimetableBox';

function setup(propOverrides) {
  const props = Object.assign({
    isFetching: false,
    didInvalidate: false,
    fetchTimetableAgain: expect.createSpy(),
    data: {
      date: [
        {c: 'number', d: 'date'},
        {c: '', d: ''},
        {c: '', d: ''}
      ],
      timetable: [
        [{c: 'number', id: '11', t: 'time'}, {c: 'number', id: '12', t: 'time'}],
        [{c: 'number', id: '21', t: 'time'}, {c: 'number', id: '22', t: 'time'}],
        [{c: 'number', id: '31', t: 'time'}, {c: 'number', id: '32', t: 'time'}]
      ]
    }
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <TimetableBox {...props} />
  );

  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('TimatableBox', () => {
    it('should render date area correctly on succcess', () => {
      const { output, props } = setup();

      const ulDate = output.props.children.props.children[0];
      expect(ulDate.type).toBe('ul');

      const liDate = ulDate.props.children[0];
      expect(liDate.props.className).toBe(props.data.date[0].c);
      expect(liDate.props.dateNodes).toBe(props.data.date[0].d);
    });

    it('should render timetable area correctly on succcess', () => {
      const { output, props } = setup();

      const divTimetable = output.props.children.props.children[1];
      expect(divTimetable.type).toBe('div');

      const divTimetableColumns = divTimetable.props.children[0];
      expect(divTimetableColumns.props.columns).toBe(props.data.timetable[0]);
    });

    it('should render correctly on loading', () => {
      const { output } = setup({ isFetching: true });
      const divLoading = output.props.children;
      expect(divLoading.props.className).toBe('loading');
    });

    it('should render correctly on fail', () => {
      const { output } = setup({ didInvalidate: true });
      const divError = output.props.children;
      expect(divError.props.className).toBe('error');
    });

    it('should call fetchTimetableAgain on clicked', () => {
      const { output, props } = setup({ didInvalidate: true });
      output.props.children.props.children[1].props.onClick();
      expect(props.fetchTimetableAgain).toHaveBeenCalledWith();
    });
  });
});
