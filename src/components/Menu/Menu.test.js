// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from './Menu';

describe('<Menu />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<Menu {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
