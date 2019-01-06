// @flow

import * as appActions from '../appActions';
import { APP_LOADING } from '../../constants/actionTypes';

/**
 * App Actions Tests
 */

describe('Actions: AppActions:', () => {
  test('loaded() should return the loaded data object', () => {
    const EXPECTED_ACTION = { type: APP_LOADING };
    expect(appActions.loading()).toEqual(EXPECTED_ACTION);
  });
});
