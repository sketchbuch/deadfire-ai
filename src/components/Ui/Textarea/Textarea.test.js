import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Textarea from './Textarea';

describe('<Textarea />', () => {
  const props = {
    onChange: jest.fn(),
  };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Textarea {...props} />, div);
  });

  test('Handles disabled property', () => {
    const props = {
      onChange: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<Textarea {...props} />);
    wrapper.simulate('change')
    expect(props.onChange.mock.calls.length).toBe(0);
  });

  test('Handles classes property', () => {
    const cn1Props = { classes: '', onChange: jest.fn(), to: '/classes' };
    const cn1Wrapper = shallow(<Textarea {...cn1Props} />);
    const cn2Props = { classes: 'TestClass', onChange: jest.fn(), to: '/classes' };
    const cn2Wrapper = shallow(<Textarea {...cn2Props} />);

    expect(cn1Wrapper.find('textarea').hasClass(cn2Props.classes)).toEqual(false);
    expect(cn2Wrapper.find('textarea').hasClass(cn2Props.classes)).toEqual(true);
  });

  test('Handles isValid property', () => {
    const props1 = { isValid: true, onChange: jest.fn(), to: '/classes' };
    const wrapper1 = shallow(<Textarea {...props1} />);
    const props2 = { isValid: false, onChange: jest.fn(), to: '/classes' };
    const wrapper2= shallow(<Textarea {...props2} />);

    expect(wrapper1.find('textarea').hasClass('has--error')).toEqual(false);
    expect(wrapper2.find('textarea').hasClass('has--error')).toEqual(true);
  });
});
