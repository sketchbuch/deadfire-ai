// @flow

import React from 'react';
import { shallow } from 'enzyme';
import NotFoundLayout from './NotFoundLayout';

describe('<NotFoundLayout />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<NotFoundLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
