// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Label from './Label';

test('<Label />: Renders without crashing', () => {
  const wrapper = shallow(<Label />);
  expect(wrapper).toHaveLength(1);
});
