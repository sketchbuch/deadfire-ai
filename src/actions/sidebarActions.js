// @flow

import { SIDEBAR_LOADED, SIDEBAR_LOADING } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';

export function loading(): ActionCreator {
  return { type: SIDEBAR_LOADING };
}

export function loaded(): ActionCreator {
  return { type: SIDEBAR_LOADED };
}
