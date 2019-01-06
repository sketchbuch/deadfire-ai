//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import ButtonCircular from './ButtonCircular';

describe('<ButtonCircular />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonCircular />, div);
  });

  test('Handles visual property', () => {
    const props = {
      visual: true,
    };
    const wrapper = mount(<ButtonCircular {...props} />);
    expect(wrapper.find('button')).toHaveLength(0);
  });

  test('Handles classes property', () => {
    const cn1Props = { classes: '' };
    const cn1Wrapper = shallow(<ButtonCircular {...cn1Props} />);
    const cn2Props = { classes: 'TestClass' };
    const cn2Wrapper = shallow(<ButtonCircular {...cn2Props} />);

    expect(
      cn1Wrapper.find('.ButtonCircular').hasClass(cn2Props.classes)
    ).toEqual(false);
    expect(
      cn2Wrapper.find('.ButtonCircular').hasClass(cn2Props.classes)
    ).toEqual(true);
  });
});
