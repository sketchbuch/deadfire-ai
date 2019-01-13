// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import SettingsLayout from './SettingsLayout';

describe('<SettingsLayout />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SettingsLayout {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });
});
