// @flow

import * as settingsActions from '../settingsActions';
import { SETTINGS_UPDATE } from '../../constants/actionTypes';

/**
 * Setting Actions Tests
 */

describe('Actions: SettingActions:', () => {
  test('update() should dispatch the correct action', () => {
    const SETTINGS = { installPath: 'path/to/file' };
    const EXPECTED_ACTION = { type: SETTINGS_UPDATE, payload: { ...SETTINGS } };
    expect(settingsActions.update(SETTINGS)).toEqual(EXPECTED_ACTION);
  });
});
