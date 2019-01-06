// @flow

import React from 'react';
import { shallow } from 'enzyme';
import SettingsLayout from './SettingsLayout';

describe('<SettingsLayout />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<SettingsLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
