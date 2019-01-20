// @flow

import { SETTINGS_LOAD_SUCCESS, SETTINGS_SAVE } from '../constants/actionTypes';
import type { ActionObj } from '../types/action';
import type { SettingsState } from '../types/settings';
import settingsDefault from '../types/settings';

export default function reducer(state: SettingsState = settingsDefault, action: ActionObj) {
  switch (action.type) {
    case SETTINGS_LOAD_SUCCESS:
    case SETTINGS_SAVE:
      if (action.payload) {
        return { ...state, ...action.payload };
      }
      break;

    default:
      return state;
  }

  return state;
}
