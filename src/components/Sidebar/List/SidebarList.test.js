// @flow

import React from 'react';
import { shallow } from 'enzyme';
import SidebarList from './SidebarList';

describe('<SidebarList />', () => {
  const props = {
    onChange: jest.fn(),
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<SidebarList {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders empty message if no items', () => {
    const wrapper = shallow(<SidebarList {...props} />);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('ul')).toHaveLength(0);
  });

  test('Renders items if there are any', () => {
    const wrapper = shallow(<SidebarList {...props} items={[{ id: '1' }]} />);
    expect(wrapper.find('p')).toHaveLength(0);
    expect(wrapper.find('ul')).toHaveLength(1);
  });
});
