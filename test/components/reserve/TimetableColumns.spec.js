import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TimetableColumns from '../../../src/js/components/Reserve/TimetableColumns';

function setup(propOverrides) {
  const props = Object.assign({
    columns: [
      {c: '0', id: '111', t: 'time'},
      {c: '1', id: '222', t: 'time'},
      {c: '2', id: '333', t: 'time'},
      {c: '3', id: '444', t: 'time'}
    ]
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <TimetableColumns {...props} />
  );

  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('TimetableColumns', () => {
    it('should render close button correctly', () => {
      const { output } = setup();

      const div = output.props.children[0];
      expect(div.type).toBe('div');
      expect(div.props.className).toBe('rsv rsv-close');
      const p = div.props.children
      expect(p.type).toBe('p');
      expect(p.props.children).toBe('ー');
    });

    it('should render reserved button correctly', () => {
      const { output } = setup();

      const div = output.props.children[1];
      expect(div.type).toBe('div');
      expect(div.props.className).toBe('rsv rsv-reserved');
      const p = div.props.children
      expect(p.type).toBe('p');
      expect(p.props.children).toBe('予約済み');
    });

    it('should render myReservation button correctly', () => {
      const { output } = setup();

      const div = output.props.children[2];
      expect(div.type).toBe('div');
      expect(div.props.className).toBe('rsv rsv-myreservation');
      const p = div.props.children
      expect(p.type).toBe('p');
      expect(p.props.children).toBe('自分の予約');

    });

    it('should render open button correctly', () => {
      const { output, props } = setup();

      const form = output.props.children[3];
      expect(form.type).toBe('form');
      expect(form.props.action).toBe('/determine');

      const Token = form.props.children[0]
      expect(Token.type).toBe('input');
      expect(Token.props.type).toBe('hidden');
      expect(Token.props.name).toBe('_token');
      expect(Token.props.value).toBe('testToken');

      const id = form.props.children[1]
      expect(id.type).toBe('input');
      expect(id.props.type).toBe('hidden');
      expect(id.props.name).toBe('id');
      expect(id.props.value).toBe(props.columns[3].id);

    });
  });
});
