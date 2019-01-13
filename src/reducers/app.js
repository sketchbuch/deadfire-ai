// @flow

import {
  APP_MENU_CONTRACT,
  APP_ERROR,
  APP_MENU_EXPAND,
  APP_LOADED,
  APP_STORAGE_CREATED,
  DATA_LOAD_ERROR,
  LANGUAGE_LOAD_ERROR,
  SETTINGS_LOAD_ERROR,
  SETTINGS_UPDATE_SUCCESS,
} from '../constants/actionTypes';
import type { ActionObj } from '../types/action';
import type { AppState } from '../types/app';
import appDefault from '../types/app';

/**
 * App Reducer.
 */
export default function reducer(state: AppState = appDefault, action: ActionObj) {
  switch (action.type) {
    case DATA_LOAD_ERROR:
    case LANGUAGE_LOAD_ERROR:
    case SETTINGS_LOAD_ERROR:
      if (action.payload) {
        return { ...state, errorMsg: action.payload.error };
      }
      break;

    case APP_ERROR:
      return { ...state, error: true };

    case APP_LOADED:
      return { ...state, loaded: true };

    case APP_MENU_CONTRACT:
      return { ...state, menuExpanded: false };

    case APP_MENU_EXPAND:
      return { ...state, menuExpanded: true };

    case APP_STORAGE_CREATED:
      return { ...state, storageCreated: true };

    case SETTINGS_UPDATE_SUCCESS:
      return { ...state, installPathSet: true };

    default:
      return state;
  }

  return state;
}
