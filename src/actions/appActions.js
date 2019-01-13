// @flow

import { APP_MENU_CONTRACT, APP_MENU_EXPAND, APP_LOADING } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';

/**
 * App Actions
 */

export function loading(): ActionCreator {
  return { type: APP_LOADING };
}

export function expandMenu(): ActionCreator {
  return { type: APP_MENU_EXPAND };
}

export function contractMenu(): ActionCreator {
  return { type: APP_MENU_CONTRACT };
}
