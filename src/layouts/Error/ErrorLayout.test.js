// @flow

import React from 'react';
import { shallow } from 'enzyme';
import ErrorLayout from './ErrorLayout';

describe('<ErrorLayout />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<ErrorLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
