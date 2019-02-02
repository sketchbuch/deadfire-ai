// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import SidebarInner, { ItemContent } from './SidebarInner';
import { ICON_SCRIPTS } from '../../../constants/icons';

describe('<SidebarInner />', () => {
  const props = {
    children: null,
    description: '(0)',
    icon: ICON_SCRIPTS,
    isError: false,
    label: 'Fighter Script',
    link: '/script',
    linkEdit: '/script/edit',
    onClick: jest.fn(),
  };

  delete window.location;
  window.location = { pathname: '/' };

  test('Renders without crashing', () => {
    const wrapper = shallow(<SidebarInner {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  describe('isSelected:', () => {
    test('Renders a div if no link', () => {
      const wrapper = shallow(<SidebarInner {...props} link="" />);
      expect(wrapper.find('div.SidebarInner')).toHaveLength(1);
    });

    test('Renders a Link if there is a link', () => {
      const wrapper = shallow(<SidebarInner {...props} />);
      expect(wrapper.find(Link)).toHaveLength(1);
    });

    test('Not selected if location does not match link or linkEdit', () => {
      const wrapper = shallow(<SidebarInner {...props} />);
      expect(wrapper.find(Link)).toHaveLength(1);
      expect(wrapper.find('.SidebarInner--selected')).toHaveLength(0);
    });

    test('Is selected if location matches link', () => {
      window.location.pathname = props.link;
      const wrapper = shallow(<SidebarInner {...props} />);
      expect(wrapper.find(Link)).toHaveLength(1);
      expect(wrapper.find('.SidebarInner--selected')).toHaveLength(1);
    });

    test('Is selected if location matches linkEdit', () => {
      window.location.pathname = props.linkEdit;
      const wrapper = shallow(<SidebarInner {...props} />);
      expect(wrapper.find(Link)).toHaveLength(1);
      expect(wrapper.find('.SidebarInner--selected')).toHaveLength(1);
    });
  });
});

describe('<ItemContent />', () => {
  const props = {
    children: null,
    description: '(0)',
    label: 'Fighter Script',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<ItemContent {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
