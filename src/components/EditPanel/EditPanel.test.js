// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { EditPanel } from './EditPanel';

describe('<EditPanel />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<EditPanel {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
