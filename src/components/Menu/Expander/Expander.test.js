// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { Expander } from './Expander';

describe('<Expander />', () => {
  const props = {
    expanded: false,
    onClick: jest.fn(),
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Expander {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Label is "Expand" if expanded === false', () => {
    const wrapper = shallow(<Expander {...props} />);
    expect(wrapper.find('.Menu__expander').prop('title')).toEqual(window.app.translations.EN.Expander.Expand);
  });

  test('Label is "Contract" if expanded === true', () => {
    const wrapper = shallow(<Expander {...props} expanded={true} />);
    expect(wrapper.find('.Menu__expander').prop('title')).toEqual(window.app.translations.EN.Expander.Contract);
  });

  test('Click handler called', () => {
    const wrapper = shallow(<Expander {...props} />);
    wrapper.simulate('click');
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
