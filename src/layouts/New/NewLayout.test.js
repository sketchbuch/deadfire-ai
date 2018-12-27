// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewLayout from './NewLayout';

configure({ adapter: new Adapter() });

describe('<NewLayout />', () => {
  const props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<NewLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
