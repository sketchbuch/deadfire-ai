// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('<Header />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
