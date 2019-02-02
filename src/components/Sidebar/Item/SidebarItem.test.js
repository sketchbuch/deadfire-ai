// @flow

import React from 'react';
import { shallow } from 'enzyme';
import SidebarItem from './SidebarItem';
import { DOMAIN_SCRIPTS } from '../../../constants/domains';
import { PARSE_STATE_ERROR } from '../../../constants/misc';
import aiscriptDefault, { aiScriptSort, factory } from '../../../types/aiscript';

describe('<SidebarItem />', () => {
  const ts = Date.now();
  const props = {
    item: factory({ ...aiscriptDefault }, ts),
    itemType: DOMAIN_SCRIPTS,
    sortOrder: aiScriptSort,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<SidebarItem {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  describe('parseState:', () => {
    test('Does not add error class if item parseState !== PARSE_STATE_ERROR', () => {
      const wrapper = shallow(<SidebarItem {...props} />);
      expect(wrapper.find('.SidebarItem--error')).toHaveLength(0);
    });

    test('Adds error class if item parseState === PARSE_STATE_ERROR', () => {
      props.item.parseState = PARSE_STATE_ERROR;
      const wrapper = shallow(<SidebarItem {...props} />);
      expect(wrapper.find('.SidebarItem--error')).toHaveLength(1);
    });
  });
});
