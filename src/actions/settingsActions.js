// @flow

import { SETTINGS_UPDATE } from '../constants/actionTypes';
import type { SettingsState } from '../types/settings';
import type { ActionCreator } from '../types/action';

/**
 * Setting Actions
 */

export function update(settings: SettingsState): ActionCreator {
  return { type: SETTINGS_UPDATE, payload: { ...settings } };
}
