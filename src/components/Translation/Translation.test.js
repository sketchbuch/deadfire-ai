// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import Translation from './Translation';

const windowApp = { ...window.app };

describe('<Translation />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Translation name="Name" ns="App" />, div);
  });

  test('Renders the correct translation', () => {
    const wrapper = shallow(<Translation name="Name" ns="App" />);
    expect(wrapper.text()).toBe(window.app.translations.EN.App.Name);
  });

  test('Handles Language change', () => {
    const wrapper = mount(<Translation name="Name" ns="App" />);
    expect(wrapper.text()).toBe(window.app.translations.EN.App.Name);
    window.app.curLang = 'DE';
    wrapper.instance().forceUpdate();
    expect(wrapper.text()).toBe(window.app.translations.DE.App.Name);
    window.app.curLang = 'EN';
  });

  test('Replaces placeholders', () => {
    const wrapper = shallow(
      <Translation
        name="Placeholder"
        ns="App"
        placeholders={{ PH: 'Find me' }}
      />
    );
    expect(wrapper.text()).toBe(
      window.app.translations.EN.App.Placeholder.replace('%PH%', 'Find me')
    );
  });

  describe('Handles window.app correctly', () => {
    beforeEach(() => {
      window.app = { ...windowApp };
    });

    test('Returns ?name:ns if translations undefined', () => {
      delete window.app.translations;
      const wrapper = shallow(<Translation name="Name" ns="App" />);
      expect(wrapper.text()).toBe('?Name:App');
    });

    test('Returns ?name:ns if the language is undefined in translations', () => {
      window.app.curLang = 'IT';
      const wrapper = shallow(<Translation name="Name" ns="App" />);
      expect(wrapper.text()).toBe('?Name:App');
    });

    test('Returns ?name:ns if the namespace is undefined', () => {
      const wrapper = shallow(<Translation name="Name" ns="Wrong" />);
      expect(wrapper.text()).toBe('?Name:Wrong');
    });

    test('Returns ?name:ns if the name is undefined', () => {
      const wrapper = shallow(<Translation name="Wrong" ns="App" />);
      expect(wrapper.text()).toBe('?Wrong:App');
    });
  });

  describe('shouldComponentUpdate', () => {
    const initialProps = { name: 'Name', ns: 'App' };
    const wrapper = shallow(
      <Translation {...initialProps} placeholders={{}} />
    );
    const wrapperInstance = wrapper.instance();

    test('should not update if the props are the same', () => {
      const shouldUpdate = wrapperInstance.shouldComponentUpdate({
        name: 'Name',
        ns: 'App',
        placeholders: {},
      });
      expect(shouldUpdate).toBe(false);
    });

    test('should update if the props are different', () => {
      const shouldUpdate1 = wrapperInstance.shouldComponentUpdate({
        name: 'Placeholder',
        ns: 'App',
      });
      const shouldUpdate2 = wrapperInstance.shouldComponentUpdate({
        name: 'Placeholder',
        ns: 'NotFound',
      });
      window.app.curLang = 'DE';
      const shouldUpdate3 = wrapperInstance.shouldComponentUpdate({
        name: 'Placeholder',
        ns: 'NotFound',
      });
      window.app.curLang = 'EN';
      expect(shouldUpdate1).toBe(true);
      expect(shouldUpdate2).toBe(true);
      expect(shouldUpdate3).toBe(true);
    });
  });

  test('componentWillUpdate()', () => {
    const wrapper = mount(<Translation name="Name" ns="App" />);
    const wrapperInstance = wrapper.instance();
    expect(wrapperInstance.prevLang).toBe('EN');
    window.app.curLang = 'DE';
    wrapper.setProps({ name: 'Placeholder' });
    expect(wrapperInstance.prevLang).toBe('DE');
    window.app.curLang = 'EN';
  });
});
