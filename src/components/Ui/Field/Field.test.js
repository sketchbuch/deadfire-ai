// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Field from './Field';

test('<Field />: Renders without crashing', () => {
  const wrapper = shallow(<Field />);
  expect(wrapper).toHaveLength(1);
});
