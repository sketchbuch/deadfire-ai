// @flow

import * as appActions from '../appActions';
import { APP_CONTRACT_MENU, APP_EXPAND_MENU, APP_LOADING } from '../../constants/actionTypes';

/**
 * App Actions Tests
 */

describe('Actions: AppActions:', () => {
  test('loaded() should return the APP_LOADING action', () => {
    const EXPECTED_ACTION = { type: APP_LOADING };
    expect(appActions.loading()).toEqual(EXPECTED_ACTION);
  });

  test('expandMenu() should return the APP_EXPAND_MENU action', () => {
    const EXPECTED_ACTION = { type: APP_EXPAND_MENU };
    expect(appActions.expandMenu()).toEqual(EXPECTED_ACTION);
  });

  test('contractMenu() should return the APP_CONTRACT_MENU action', () => {
    const EXPECTED_ACTION = { type: APP_CONTRACT_MENU };
    expect(appActions.contractMenu()).toEqual(EXPECTED_ACTION);
  });
});
