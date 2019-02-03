// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { ActionSet } from './ActionSet';

describe('<ActionSet />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<ActionSet {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
