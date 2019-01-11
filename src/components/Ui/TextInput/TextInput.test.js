import React from 'react';
import { shallow, mount } from 'enzyme';
import TextInput from './TextInput';
import { UI_ERROR_CLASS } from '../../../constants/ui';

describe('<TextInput />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<TextInput />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles disabled property', () => {
    const props = {
      onChange: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<TextInput {...props} />);
    wrapper.simulate('keydown', { which: 'a' });
    expect(props.onChange.mock.calls.length).toBe(0);
  });

  test('Handles classes property', () => {
    const cn1Props = { classes: '' };
    const cn1Wrapper = shallow(<TextInput {...cn1Props} />);
    const cn2Props = { classes: 'TestClass' };
    const cn2Wrapper = shallow(<TextInput {...cn2Props} />);

    expect(cn1Wrapper.find('.TextInput').hasClass(cn2Props.classes)).toEqual(false);
    expect(cn2Wrapper.find('.TextInput').hasClass(cn2Props.classes)).toEqual(true);
  });

  test('Handles isValid property', () => {
    const iv1Props = { isValid: true };
    const iv1Wrapper = shallow(<TextInput {...iv1Props} />);
    const iv2Props = { isValid: false };
    const iv2Wrapper = shallow(<TextInput {...iv2Props} />);

    expect(iv1Wrapper.find('.TextInput').hasClass(UI_ERROR_CLASS)).toEqual(false);
    expect(iv2Wrapper.find('.TextInput').hasClass(UI_ERROR_CLASS)).toEqual(true);
  });
});
