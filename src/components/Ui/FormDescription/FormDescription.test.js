// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FormDescription from './FormDescription';

test('<FormDescription />: Renders without crashing', () => {
  const wrapper = shallow(<FormDescription />);
  expect(wrapper).toHaveLength(1);
});
