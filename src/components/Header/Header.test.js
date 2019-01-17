// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Translation from '../Translation/Translation';
import { Header } from './Header';

describe('<Header />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Uses app name from translation if available', () => {
    const testStr = 'US - Deadfire AI Editor';
    window.app.current = 'US';
    window.app.translations[window.app.current] = {
      App: {
        Name: testStr,
      },
    };
    const wrapper = shallow(<Header {...props} />);
    const trans = wrapper.find(Translation);
    expect(trans).toHaveLength(1);
    expect(trans.dive().text()).toBe(testStr);
  });

  test('Uses hardcoded name if no translation exists', () => {
    window.app.current = 'IT';
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper.find('.Header__title').text()).toBe('Deadfire AI Editor');
  });
});
