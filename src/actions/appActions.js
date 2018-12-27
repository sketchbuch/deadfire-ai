// @flow

import { APP_LOADING } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';


/**
* App Actions
*/

export function loading(): ActionCreator {
  return { type: APP_LOADING };
}