// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { Switch } from 'react-router-dom';
import AppPresenter from './AppPresenter';
import NewLayout from '../../layouts/New/NewLayout';
import ErrorLayout from '../../layouts/Error/ErrorLayout';

describe('<AppPresenter />', () => {
  const props = {
    error: false,
    errorMsg: '',
    installPathSet: false,
    loaded: false,
    storageCreated: false,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<AppPresenter {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('loaded="false" does not render anything', () => {
    const wrapper = shallow(<AppPresenter {...props} />);
    expect(wrapper.find(ErrorLayout)).toHaveLength(0);
    expect(wrapper.find(NewLayout)).toHaveLength(0);
    expect(wrapper.find(Switch)).toHaveLength(0);
  });

  describe('When loaded="true":', () => {
    const propsLoaded = { ...props, loaded: true };

    describe('Shows ErrorLayout correctly', () => {
      test('error="false" does not render an error message', () => {
        const wrapper = shallow(<AppPresenter {...propsLoaded} />);
        expect(wrapper.find(ErrorLayout)).toHaveLength(0);
      });

      test('error="true" renders an error message', () => {
        const wrapper = shallow(<AppPresenter {...propsLoaded} error={true} />);
        wrapper.update();
        expect(wrapper.find(ErrorLayout)).toHaveLength(1);
      });
    });

    describe('Shows NewLayout correctly', () => {
      test('storageCreated="true && installPathSet="false" shows the new layout', () => {
        const wrapper = shallow(
          <AppPresenter {...propsLoaded} storageCreated={true} />
        );
        expect(wrapper.find(NewLayout)).toHaveLength(1);
      });

      test('storageCreated="true && installPathSet="true" does not show the new layout', () => {
        const wrapper = shallow(
          <AppPresenter
            {...propsLoaded}
            storageCreated={true}
            installPathSet={true}
          />
        );
        expect(wrapper.find(NewLayout)).toHaveLength(0);
      });
    });
  });
});
