// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';

describe('<Sidebar />', () => {
  const props = {
    footer: false,
    header: false,
    loadSidebar: jest.fn(),
    loading: false,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Sidebar {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  describe('header:', () => {
    test('Handles header and footer props correctly', () => {
      let wrapper = shallow(<Sidebar {...props} />);

      expect(wrapper.find('.Sidebar').hasClass('Sidebar--header')).toEqual(false);
      expect(wrapper.find('.Sidebar').hasClass('Sidebar--footer')).toEqual(false);
    });

    test('Has header class if header === true', () => {
      const wrapper = shallow(<Sidebar {...props} header={true} />);
      expect(wrapper.find('.Sidebar').hasClass('Sidebar--header')).toEqual(true);
    });

    test('Has footer class if footer === true', () => {
      const wrapper = shallow(<Sidebar {...props} footer={true} />);
      expect(wrapper.find('.Sidebar').hasClass('Sidebar--footer')).toEqual(true);
    });
  });

  describe('loading:', () => {
    test('loadSidebar is not called if !loading', () => {
      const mockLoadSidebar = jest.fn();

      shallow(<Sidebar {...props} loadSidebar={mockLoadSidebar} />);
      expect(mockLoadSidebar).not.toHaveBeenCalled();
    });

    test('loadSidebar is called if loading', () => {
      const mockLoadSidebar = jest.fn();

      shallow(<Sidebar {...props} loadSidebar={mockLoadSidebar} loading={true} />);
      expect(mockLoadSidebar).toHaveBeenCalledTimes(1);
    });

    test('Renders skeleton if loading', () => {
      const wrapper = shallow(
        <Sidebar {...props} loading={true}>
          <p>child</p>
        </Sidebar>
      );
      expect(wrapper.find('.SidebarSkeleton')).toHaveLength(1);
      expect(wrapper.find('p')).toHaveLength(0);
    });

    test('Renders children if not loading', () => {
      const wrapper = shallow(
        <Sidebar {...props}>
          <p>child</p>
        </Sidebar>
      );
      expect(wrapper.find('.SidebarSkeleton')).toHaveLength(0);
      expect(wrapper.find('p')).toHaveLength(1);
    });
  });
});
