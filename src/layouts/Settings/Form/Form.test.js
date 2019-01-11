// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';

describe('<Form />', () => {
  const props = {
    busy: false,
    disabled: false,
    errors: [],
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    value: '',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Form {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
