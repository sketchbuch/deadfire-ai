// @flow

import reducer from '../app';
import appDefault from '../../types/app';
import {
  APP_CONTRACT_MENU,
  APP_ERROR,
  APP_EXPAND_MENU,
  APP_LOADED,
  APP_STORAGE_CREATED,
  DATA_LOAD_ERROR,
  LANGUAGE_LOAD_ERROR,
  SETTINGS_LOAD_ERROR,
} from '../../constants/actionTypes';

/**
 * App Reducer Tests
 */

describe('Reducer: App', () => {
  const initialState = { ...appDefault };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  test('APP_ERROR should return with error = true', () => {
    const expectedState = { ...appDefault, error: true };
    expect(reducer(initialState, { type: APP_ERROR })).toEqual(expectedState);
  });

  test('APP_STORAGE_CREATED should return with storageCreated = true', () => {
    const expectedState = { ...appDefault, storageCreated: true };
    expect(reducer(initialState, { type: APP_STORAGE_CREATED })).toEqual(expectedState);
  });

  test('APP_LOADED should return with loaded = true', () => {
    const expectedState = { ...appDefault, loaded: true };
    expect(reducer(initialState, { type: APP_LOADED })).toEqual(expectedState);
  });

  test('APP_EXPAND_MENU should set menuExpanded to true', () => {
    const expectedState = { ...appDefault, menuExpanded: true };
    expect(reducer(initialState, { type: APP_EXPAND_MENU })).toEqual(expectedState);
  });

  test('APP_CONTRACT_MENU should set menuExpanded to false', () => {
    const expectedState = { ...appDefault, menuExpanded: false };
    expect(reducer(initialState, { type: APP_CONTRACT_MENU })).toEqual(expectedState);
  });

  describe('Error Message:', () => {
    const errorMsg = 'An error occured';
    const expectedState = { ...appDefault, errorMsg };

    test('DATA_LOAD_ERROR should set the errorMsg', () => {
      const actionObj = {
        type: DATA_LOAD_ERROR,
        payload: { error: errorMsg },
      };
      expect(reducer(initialState, actionObj)).toEqual(expectedState);
    });

    test('DATA_LOAD_ERROR returns the initial state if there is no payload', () => {
      const actionObj = { type: DATA_LOAD_ERROR };
      expect(reducer(initialState, actionObj)).toEqual(initialState);
    });

    test('LANGUAGE_LOAD_ERROR should set the errorMsg', () => {
      const actionObj = {
        type: LANGUAGE_LOAD_ERROR,
        payload: { error: errorMsg },
      };
      expect(reducer(initialState, actionObj)).toEqual(expectedState);
    });

    test('LANGUAGE_LOAD_ERROR returns the initial state if there is no payload', () => {
      const actionObj = { type: LANGUAGE_LOAD_ERROR };
      expect(reducer(initialState, actionObj)).toEqual(initialState);
    });

    test('SETTINGS_LOAD_ERROR should set the errorMsg', () => {
      const actionObj = {
        type: SETTINGS_LOAD_ERROR,
        payload: { error: errorMsg },
      };
      expect(reducer(initialState, actionObj)).toEqual(expectedState);
    });

    test('SETTINGS_LOAD_ERROR returns the initial state if there is no payload', () => {
      const actionObj = { type: SETTINGS_LOAD_ERROR };
      expect(reducer(initialState, actionObj)).toEqual(initialState);
    });
  });
});
