// @flow

import React from 'react';
import { shallow } from 'enzyme';
import menuItemDefault from '../../../types/menuitem';
import { Inner } from './Inner';

describe('<Inner />', () => {
  const props = { ...menuItemDefault, label: 'Item 1', description: 'Edit items' };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Inner {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
