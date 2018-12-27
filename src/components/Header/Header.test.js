// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from './Header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
