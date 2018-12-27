// @flow

import {
  SETTINGS_LOAD_SUCCESS,
} from '../constants/actionTypes';
import type { ActionObj } from '../types/action';
import type { Settings } from '../types/settings';
import settingsDefault from '../types/settings';


/**
* Settings Reducer.
*/

export default function reducer(state: Settings = settingsDefault, action: ActionObj) {
  switch (action.type) {
    case SETTINGS_LOAD_SUCCESS:
      if (action.payload && action.payload.settings) return {...action.payload.settings};
      break;

    default:
      return state;
  }

  return state;
}
