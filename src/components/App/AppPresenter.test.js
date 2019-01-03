// @flow

import React from 'react';
import { shallow } from 'enzyme';
import AppPresenter from './AppPresenter';

describe('<AppPresenter />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<AppPresenter />);
    expect(wrapper).toHaveLength(1);
  });
});
