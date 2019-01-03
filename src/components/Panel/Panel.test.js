// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { Panel } from './Panel';

describe('<Panel />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<Panel {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
