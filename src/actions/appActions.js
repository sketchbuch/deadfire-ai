// @flow

import { APP_ERRORED, APP_LOADING } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';


/**
* App Actions
*/

export function loading(hideLoader: Function): ActionCreator {
  return { type: APP_LOADING };
}

export function errored(hideLoader: Function): ActionCreator {
  hideLoader();
  return { type: APP_ERRORED };
}