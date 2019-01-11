// @flow

import { APP_CONTRACT_MENU, APP_EXPAND_MENU, APP_LOADING } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';

/**
 * App Actions
 */

export function loading(): ActionCreator {
  return { type: APP_LOADING };
}

export function expandMenu(): ActionCreator {
  return { type: APP_EXPAND_MENU };
}

export function contractMenu(): ActionCreator {
  return { type: APP_CONTRACT_MENU };
}
