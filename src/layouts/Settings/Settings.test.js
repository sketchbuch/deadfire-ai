// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Settings from './Settings';

describe('<Settings />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<Settings {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
