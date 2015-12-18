import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import SelectBox from '../../../src/js/components/Reserve/SelectBox';

function setup(propOverrides) {
  const props = Object.assign({
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
    },
    isFetching: false,
    handleType: expect.createSpy(),
    handlePlace: expect.createSpy()
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <SelectBox {...props} />
  );

  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output
  };
}

describe('components', () => {
  describe('SelectBox', () => {
    it('should render SelectBox wrap correctly', () => {
      const { output } = setup();
      expect(output.type).toBe('form');
      expect(output.props.className).toBe('select-box');

      const divType = output.props.children[0];
      expect(divType.type).toBe('div');
      expect(divType.props.className).toBe('type clearfix');

      const divPlace = output.props.children[1];
      expect( divPlace.type).toBe('div');
      expect( divPlace.props.className).toBe('place clearfix');
    });

    it('should render select type area correctly', () => {
      const { output, props } = setup();
      const divType = output.props.children[0].props.children[1];

      const div0 = divType[0];
      expect(div0.type).toBe('div');

      const input0 = div0.props.children[0];
      expect(input0.type).toBe('input');
      expect(input0.props.type).toBe('radio');
      expect(input0.props.id).toBe(props.selector.flightTypes[0].en);
      expect(input0.props.name).toBe('type');
      expect(input0.props.value).toBe(props.selector.flightTypes[0].id);
      expect(input0.props.checked).toBe(props.selector.flightTypes[0].checked);

      const label0 = div0.props.children[1];
      expect(label0.type).toBe('label');
      expect(label0.props.htmlFor).toBe(props.selector.flightTypes[0].en);
      expect(label0.props.children).toBe(props.selector.flightTypes[0].name);

      const div1 = divType[1];
      expect(div1.type).toBe('div');

      const input1 = div1.props.children[0];
      expect(input1.type).toBe('input');
      expect(input1.props.type).toBe('radio');
      expect(input1.props.id).toBe(props.selector.flightTypes[1].en);
      expect(input1.props.name).toBe('type');
      expect(input1.props.value).toBe(props.selector.flightTypes[1].id);
      expect(input1.props.checked).toBe(props.selector.flightTypes[1].checked);

      const label1 = div1.props.children[1];
      expect(label1.type).toBe('label');
      expect(label1.props.htmlFor).toBe(props.selector.flightTypes[1].en);
      expect(label1.props.children).toBe(props.selector.flightTypes[1].name);
    });

    it('should render select place area correctly', () => {
      const { output, props } = setup();
      const divPlace = output.props.children[1].props.children[1];

      const place0 = divPlace[0];
      expect(place0.type).toBe('input');
      expect(place0.props.style.background).toBe(`url(${props.selector.places[0].path})`);
      expect(place0.props.style.pointerEvents).toBe(undefined);
      expect(place0.props.name).toBe('place');
      expect(place0.props.value).toBe(props.selector.places[0].id);
      expect(place0.props.checked).toBe(props.selector.places[0].checked);

      const place1 = divPlace[1];
      expect(place1.type).toBe('input');
      expect(place1.props.style.background).toBe(`url(${props.selector.places[1].path})`);
      expect(place1.props.style.pointerEvents).toBe(undefined);
      expect(place1.props.name).toBe('place');
      expect(place1.props.value).toBe(props.selector.places[1].id);
      expect(place1.props.checked).toBe(props.selector.places[1].checked);

      const place2 = divPlace[2];
      expect(place2.type).toBe('input');
      expect(place2.props.style.background).toBe(`url(${props.selector.places[2].path})`);
      expect(place2.props.style.pointerEvents).toBe('none');
      expect(place2.props.name).toBe('place');
      expect(place2.props.value).toBe(props.selector.places[2].id);
      expect(place2.props.checked).toBe(props.selector.places[2].checked);

      const place3 = divPlace[3];
      expect(place3.type).toBe('input');
      expect(place3.props.style.background).toBe(`url(${props.selector.places[3].path})`);
      expect(place3.props.style.pointerEvents).toBe('none');
      expect(place3.props.name).toBe('place');
      expect(place3.props.value).toBe(props.selector.places[3].id);
      expect(place3.props.checked).toBe(props.selector.places[3].checked);
    });

    it('should return selected type on radio button is changed', () => {
      const { output, props } = setup();
      output.props.onChange({ target: { checked: true, name: 'type', value:'123' } });
      expect(props.handleType).toHaveBeenCalledWith('123');
    });

    it('should return selected type on radio button is changed', () => {
      const { output, props } = setup();
      output.props.onChange({ target: { checked: true, name: 'place', value:'321' } });
      expect(props.handlePlace).toHaveBeenCalledWith('321');
    });
  });
});
