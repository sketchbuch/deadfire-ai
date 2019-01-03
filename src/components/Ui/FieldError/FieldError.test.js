// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FieldError from './FieldError';

test('<FieldError />: Renders without crashing', () => {
  const wrapper = shallow(<FieldError />);
  expect(wrapper).toHaveLength(1);
});
