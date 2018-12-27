// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotFoundLayout from './NotFoundLayout';

configure({ adapter: new Adapter() });

describe('<NotFoundLayout />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<NotFoundLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
