// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';

test('<Form />: Renders without crashing', () => {
  const wrapper = shallow(<Form />);
  expect(wrapper).toHaveLength(1);
});
