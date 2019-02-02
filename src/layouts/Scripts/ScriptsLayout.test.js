// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import ScriptsLayout from './ScriptsLayout';

describe('<ScriptsLayout />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ScriptsLayout {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });
});
