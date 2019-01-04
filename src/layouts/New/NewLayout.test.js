// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { NewLayout } from './NewLayout';

describe('<NewLayout />', () => {
  const props = {
    submitPath: jest.fn(),
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<NewLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
