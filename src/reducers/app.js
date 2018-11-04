// @flow

import {
  APP_ERRORED,
  APP_LOADED,
} from '../constants/actionTypes';

import type { AppType } from '../types/app';
import appDefault from '../types/app';


/**
* App Reducer.
*/
export default function reducer(state: AppType = appDefault, action: Object) {
  switch (action.type) {
    case APP_ERRORED:
      return {...state, error: true};

    case APP_LOADED:
      return {...state, loaded: true};

    default:
      return state;
  }
}
