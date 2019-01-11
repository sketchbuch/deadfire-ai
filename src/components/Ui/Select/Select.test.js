import React from 'react';
import { shallow } from 'enzyme';
import Select from './Select';

describe('<Select />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<Select />);
    expect(wrapper).toHaveLength(1);
  });
});
