// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { ActionSets } from './ActionSets';

describe('<ActionSets />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<ActionSets {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
