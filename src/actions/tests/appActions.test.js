// @flow

import * as appActions from '../appActions';
import { APP_MENU_CONTRACT, APP_MENU_EXPAND, APP_LOADING } from '../../constants/actionTypes';

/**
 * App Actions Tests
 */

describe('Actions: AppActions:', () => {
  test('loaded() should return the APP_LOADING action', () => {
    const EXPECTED_ACTION = { type: APP_LOADING };
    expect(appActions.loading()).toEqual(EXPECTED_ACTION);
  });

  test('expandMenu() should return the APP_MENU_EXPAND action', () => {
    const EXPECTED_ACTION = { type: APP_MENU_EXPAND };
    expect(appActions.expandMenu()).toEqual(EXPECTED_ACTION);
  });

  test('contractMenu() should return the APP_MENU_CONTRACT action', () => {
    const EXPECTED_ACTION = { type: APP_MENU_CONTRACT };
    expect(appActions.contractMenu()).toEqual(EXPECTED_ACTION);
  });
});
