// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { Item } from './Item';

describe('<Item />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<Item {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
