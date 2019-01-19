// @flow

import { SETTINGS_LOAD, SETTINGS_UPDATE, SETTINGS_UPDATE_SUCCESS } from '../../constants/actionTypes';
import * as settingsActions from '../settingsActions';

describe('Actions: SettingActions:', () => {
  test('update() should dispatch the SETTINGS_UPDATE action', () => {
    const SETTINGS = { installPath: 'path/to/file' };
    const EXPECTED_ACTION = { type: SETTINGS_UPDATE, payload: { ...SETTINGS } };
    expect(settingsActions.update(SETTINGS)).toEqual(EXPECTED_ACTION);
  });

  test('load() should dispatch the SETTINGS_LOAD action', () => {
    expect(settingsActions.load()).toEqual({ type: SETTINGS_LOAD });
  });

  test('updateSuccess() should dispatch the SETTINGS_UPDATE action', () => {
    expect(settingsActions.updateSuccess()).toEqual({ type: SETTINGS_UPDATE_SUCCESS });
  });
});
