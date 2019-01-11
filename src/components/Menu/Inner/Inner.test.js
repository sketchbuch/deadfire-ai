// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { Inner } from './Inner';

describe('<Inner />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<Inner {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
