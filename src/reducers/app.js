// @flow

import {
  APP_ERROR,
  APP_STORAGE_CREATED,
  APP_LOADED,
  DATA_LOAD_ERROR,
  LANGUAGE_LOAD_ERROR,
  SETTINGS_LOAD_ERROR,
} from '../constants/actionTypes';
import type { ActionObj } from '../types/action';
import type { AppType } from '../types/app';
import appDefault from '../types/app';


/**
* App Reducer.
*/
export default function reducer(state: AppType = appDefault, action: ActionObj) {
  switch (action.type) {
    case DATA_LOAD_ERROR:
    case LANGUAGE_LOAD_ERROR:
    case SETTINGS_LOAD_ERROR:
      if (action.payload) return {...state, errorMsg: action.payload.error};
      break;

    case APP_ERROR:
      return {...state, error: true};

    case APP_LOADED:
      return {...state, loaded: true};

    case APP_STORAGE_CREATED:
      return {...state, storageCreated: true};

    default:
      return state;
  }

  return state;
}
