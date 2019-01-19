// @flow

import {
  APP_ERROR,
  APP_LOADED,
  APP_LOADER_REMOVED,
  APP_LOADING,
  APP_MENU_CONTRACT,
  APP_MENU_EXPAND,
  APP_STORAGE_CREATED,
} from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';

export function contractMenu(): ActionCreator {
  document.body.classList.remove('menu-expanded');
  return { type: APP_MENU_CONTRACT };
}

export function error(): ActionCreator {
  return { type: APP_ERROR };
}

export function expandMenu(): ActionCreator {
  document.body.classList.add('menu-expanded');
  return { type: APP_MENU_EXPAND };
}

export function loading(): ActionCreator {
  return { type: APP_LOADING };
}

export function loaded(): ActionCreator {
  return { type: APP_LOADED };
}

export function loaderRemoved(): ActionCreator {
  return { type: APP_LOADER_REMOVED };
}

export function storageCreated(): ActionCreator {
  return { type: APP_STORAGE_CREATED };
}
