// @flow

import { SETTINGS_LOAD, SETTINGS_SAVE, SETTINGS_SAVE_SUCCESS } from '../../constants/actionTypes';
import * as settingsActions from '../settingsActions';

describe('Actions: SettingActions:', () => {
  test('update() should dispatch the SETTINGS_SAVE action', () => {
    const SETTINGS = { installPath: 'path/to/file' };
    const EXPECTED_ACTION = { type: SETTINGS_SAVE, payload: { ...SETTINGS } };
    expect(settingsActions.update(SETTINGS)).toEqual(EXPECTED_ACTION);
  });

  test('load() should dispatch the SETTINGS_LOAD action', () => {
    expect(settingsActions.load()).toEqual({ type: SETTINGS_LOAD });
  });

  test('updateSuccess() should dispatch the SETTINGS_SAVE action', () => {
    expect(settingsActions.updateSuccess()).toEqual({ type: SETTINGS_SAVE_SUCCESS });
  });
});
