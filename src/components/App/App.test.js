// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { App } from './App';
import store from '../../store/redux';

describe('<App />', () => {
  const props = {
    appLoading: jest.fn(),
    dispatch: jest.fn(),
    error: false,
    errorMsg: '',
    loaded: false,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });

  test('Calls app loading', () => {
    const mockAppLoading = jest.fn();
    shallow(<App {...props} appLoading={mockAppLoading} />);
    expect(mockAppLoading).toHaveBeenCalledTimes(1);
  });
});
