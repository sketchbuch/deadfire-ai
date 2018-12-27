// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppPresenter from './AppPresenter';

configure({ adapter: new Adapter() });

describe('<AppPresenter />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<AppPresenter />);
    expect(wrapper).toHaveLength(1);
  });
});
