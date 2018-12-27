// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './App';
import AppPresenter from './AppPresenter';
import store from '../../store/redux';
import '../Translation/testData';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  const props = {
    appLoading: jest.fn(),
    dispatch: jest.fn(),
    error: false,
    errorMsg: '',
    loaded: false,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><App {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  test('Calls app loading', () => {
    const mockAppLoading = jest.fn();
    shallow(<App {...props} appLoading={mockAppLoading} />);
    expect(mockAppLoading).toHaveBeenCalledTimes(1);
  });

  describe('error property', () => {
    test('"false" does not render an error message', () => {
      const wrapper = shallow(<App {...props} />);
      expect(wrapper.find('.App__error')).toHaveLength(0);
    });

    test('"true" does render an error message', () => {
      const wrapper = shallow(<App {...props} error={true} />);
      expect(wrapper.find('.App__error')).toHaveLength(1);
    });
  });

  describe('loaded property', () => {
    test('"false" does not render a loading message', () => {
      const wrapper = shallow(<App {...props} />);
      expect(wrapper.find(AppPresenter)).toHaveLength(0);
    });

    test('"true" does render a loading message', () => {
      const wrapper = shallow(<App {...props} loaded={true} />);
      expect(wrapper.find(AppPresenter)).toHaveLength(1);
    });
  });
});
