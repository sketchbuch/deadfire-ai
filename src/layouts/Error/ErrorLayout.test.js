// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorLayout from './ErrorLayout';

configure({ adapter: new Adapter() });

describe('<ErrorLayout />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<ErrorLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
