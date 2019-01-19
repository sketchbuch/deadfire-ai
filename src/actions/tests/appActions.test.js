// @flow

import {
  APP_ERROR,
  APP_LOADED,
  APP_LOADER_REMOVED,
  APP_LOADING,
  APP_MENU_CONTRACT,
  APP_MENU_EXPAND,
  APP_STORAGE_CREATED,
} from '../../constants/actionTypes';
import * as appActions from '../appActions';

describe('Actions: AppActions:', () => {
  test('contractMenu() should return the APP_MENU_CONTRACT action', () => {
    expect(appActions.contractMenu()).toEqual({ type: APP_MENU_CONTRACT });
  });

  test('expandMenu() should return the APP_MENU_EXPAND action', () => {
    expect(appActions.expandMenu()).toEqual({ type: APP_MENU_EXPAND });
  });

  test('error() should return the APP_ERROR action', () => {
    expect(appActions.error()).toEqual({ type: APP_ERROR });
  });

  test('loaded() should return the APP_LOADED action', () => {
    expect(appActions.loaded()).toEqual({ type: APP_LOADED });
  });

  test('loaded() should return the APP_LOADING action', () => {
    expect(appActions.loading()).toEqual({ type: APP_LOADING });
  });

  test('loaderRemoved() should return the APP_LOADING action', () => {
    expect(appActions.loaderRemoved()).toEqual({ type: APP_LOADER_REMOVED });
  });

  test('storageCreated() should return the APP_LOADING action', () => {
    expect(appActions.storageCreated()).toEqual({ type: APP_STORAGE_CREATED });
  });
});
