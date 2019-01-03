// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FormHeader from './FormHeader';

test('<FormHeader />: Renders without crashing', () => {
  const wrapper = shallow(<FormHeader />);
  expect(wrapper).toHaveLength(1);
});
