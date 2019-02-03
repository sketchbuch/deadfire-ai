// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import { App } from './App';

describe('<App />', () => {
  const props = {
    appLoading: jest.fn(),
    toggleMenu: jest.fn(),
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });

  test('Calls appLoading()', () => {
    const mockAppLoading = jest.fn();
    shallow(<App {...props} appLoading={mockAppLoading} />);
    expect(mockAppLoading).toHaveBeenCalledTimes(1);
  });
});
