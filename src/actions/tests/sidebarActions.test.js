// @flow

import { SIDEBAR_LOADED, SIDEBAR_LOADING } from '../../constants/actionTypes';
import * as sidebarActions from '../sidebarActions';

describe('Actions: SidebarActions:', () => {
  test('loading() returns a SIDEBAR_LOADING action', () => {
    expect(sidebarActions.loading()).toEqual({ type: SIDEBAR_LOADING });
  });

  test('loaded() returns a SIDEBAR_LOADED action', () => {
    expect(sidebarActions.loaded()).toEqual({ type: SIDEBAR_LOADED });
  });
});
