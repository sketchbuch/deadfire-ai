// @flow

import React from 'react';
import { shallow } from 'enzyme';
import ParsingMessage from './ParsingMessage';

describe('<ParsingMessage />', () => {
  const props = { headline: 'Error' };

  test('Renders without crashing', () => {
    const wrapper = shallow(<ParsingMessage {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
