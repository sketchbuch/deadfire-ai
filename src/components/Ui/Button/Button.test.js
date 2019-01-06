//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
  });

  test('Handles busy property', () => {
    const props = {
      busy: true,
    };
    const wrapper = mount(<Button {...props} />);
    expect(wrapper.find('.icofont-refresh')).toHaveLength(1);
  });

  test('Handles classes property', () => {
    const cn1Props = { classes: '' };
    const cn1Wrapper = shallow(<Button {...cn1Props} />);
    const cn2Props = { classes: 'TestClass' };
    const cn2Wrapper = shallow(<Button {...cn2Props} />);

    expect(cn1Wrapper.find('.Button').hasClass(cn2Props.classes)).toEqual(
      false
    );
    expect(cn2Wrapper.find('.Button').hasClass(cn2Props.classes)).toEqual(true);
  });
});
