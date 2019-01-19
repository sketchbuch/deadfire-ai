// @flow

import { SETTINGS_LOAD, SETTINGS_UPDATE, SETTINGS_UPDATE_SUCCESS } from '../constants/actionTypes';
import type { SettingsState } from '../types/settings';
import type { ActionCreator } from '../types/action';

export function load(): ActionCreator {
  return { type: SETTINGS_LOAD };
}

export function update(settings: SettingsState): ActionCreator {
  return { type: SETTINGS_UPDATE, payload: { ...settings } };
}

export function updateSuccess(): ActionCreator {
  return { type: SETTINGS_UPDATE_SUCCESS };
}
