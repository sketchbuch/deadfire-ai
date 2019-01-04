// @flow

import {
  SETTINGS_LOAD_SUCCESS,
  SETTINGS_UPDATE,
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
    case SETTINGS_UPDATE:
      if (action.payload) return {...state, ...action.payload};
      break;

    default:
      return state;
  }

  return state;
}
