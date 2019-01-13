// @flow

import React from 'react';
import { shallow } from 'enzyme';
import menuItemDefault from '../../../types/menuitem';
import { Item } from './Item';

describe('<Item />', () => {
  const props = { ...menuItemDefault, id: 'mi-1', label: 'Item 1', route: '#' };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Item {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders without selected class if route !== location', () => {
    const wrapper = shallow(<Item {...props} />);
    expect(wrapper.find('.Menu__item-selected')).toHaveLength(0);
  });

  test('Renders with selected class if route === location', () => {
    const wrapper = shallow(<Item {...props} route="/" />);
    expect(wrapper.find('.Menu__item-selected')).toHaveLength(1);
  });
});
