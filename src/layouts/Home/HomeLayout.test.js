// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomeLayout from './HomeLayout';

configure({ adapter: new Adapter() });

describe('<HomeLayout />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<HomeLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
