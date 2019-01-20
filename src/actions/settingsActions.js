// @flow

import { SETTINGS_LOAD, SETTINGS_SAVE, SETTINGS_SAVE_SUCCESS } from '../constants/actionTypes';
import type { SettingsState } from '../types/settings';
import type { ActionCreator } from '../types/action';

export function load(): ActionCreator {
  return { type: SETTINGS_LOAD };
}

export function save(settings: SettingsState): ActionCreator {
  return { type: SETTINGS_SAVE, payload: { ...settings } };
}

export function saveSuccess(): ActionCreator {
  return { type: SETTINGS_SAVE_SUCCESS };
}
