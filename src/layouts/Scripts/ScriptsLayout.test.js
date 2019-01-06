// @flow

import React from 'react';
import { shallow } from 'enzyme';
import ScriptsLayout from './ScriptsLayout';

describe('<ScriptsLayout />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<ScriptsLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
