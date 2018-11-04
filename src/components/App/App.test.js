// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './App';
import appDefault from '../../types/app';
import store from '../../store/redux';
import '../Translation/testData';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  const props = {
    app: appDefault,
    classes: [],
    currentLang: 'EN',
    dispatch: jest.fn(),
    settings: {},
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><App {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
