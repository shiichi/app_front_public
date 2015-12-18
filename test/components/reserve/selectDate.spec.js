import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import SelectDate from '../../../src/js/components/Reserve/SelectDate';

function setup(propOverrides) {
  const props = Object.assign({
    handleWeek: expect.createSpy(),
    isFetching: false
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <SelectDate {...props} />
  );

  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
}

describe('components', () => {
  describe('SelectDate', () => {
    it('should render SelectDate correctly', () => {
      const { output, props } = setup();
      expect(output.props.className).toBe("page-nation clearfix")

      const divBuck = output.props.children[0];
      expect(divBuck.props.className).toBe("btn-buck")

      const divNext = output.props.children[1];
      expect(divNext.props.className).toBe("btn-next")
    });

    it('should return 1 on next button clicked', () => {
      const { output, props } = setup();
      output.props.onClick({ target: { className: 'btn-next' } });
      expect(props.handleWeek).toHaveBeenCalledWith(1);
    });

    it('should return -1 on buck button clicked', () => {
      const { output, props } = setup();
      output.props.onClick({ target: { className: 'btn-buck' } });
      expect(props.handleWeek).toHaveBeenCalledWith(-1);
    });

    it('should return 1 on other area clicked', () => {
      const { output, props } = setup();
      output.props.onClick({ target: { className: 'page-nation' } });
      expect(props.handleWeek).toHaveBeenCalledWith(0);
    });
  });
});
