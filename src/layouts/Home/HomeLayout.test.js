// @flow

import React from 'react';
import { shallow } from 'enzyme';
import HomeLayout from './HomeLayout';

describe('<HomeLayout />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<HomeLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
