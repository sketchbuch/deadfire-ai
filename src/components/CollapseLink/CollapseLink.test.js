// @flow

import React from 'react';
import { shallow } from 'enzyme';
import CollapseLink from './CollapseLink';

test('<CollapseLink />: Renders without crashing', () => {
  const props = {};
  const wrapper = shallow(<CollapseLink {...props} />);
  expect(wrapper).toHaveLength(1);
});
