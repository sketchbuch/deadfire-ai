// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { Expander } from './Expander';

describe('<Expander />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<Expander {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
