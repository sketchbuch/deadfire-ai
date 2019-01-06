// @flow

import reducer from '../settings';
import settingsDefault from '../../types/settings';
import { SETTINGS_LOAD_SUCCESS } from '../../constants/actionTypes';

/**
 * Settings Reducer Tests
 */

describe('Reducer: Settings', () => {
  const initialState = { ...settingsDefault };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  describe('SETTINGS_LOAD_SUCCESS:', () => {
    test('Should update the settings correctly', () => {
      const LANG = 'DE';
      const actionObj = {
        type: SETTINGS_LOAD_SUCCESS,
        payload: {
          lang: LANG,
        },
      };
      const expectedState = { ...settingsDefault, lang: LANG };
      expect(reducer(initialState, actionObj)).toEqual(expectedState);
    });

    test('Should return the initial state if there is no payload', () => {
      const actionObj = { type: SETTINGS_LOAD_SUCCESS };
      expect(reducer(initialState, actionObj)).toEqual(initialState);
    });

    test('Should return the initial state if there is no payload.settings', () => {
      const actionObj = {
        type: SETTINGS_LOAD_SUCCESS,
        payload: {},
      };
      expect(reducer(initialState, actionObj)).toEqual(initialState);
    });
  });
});
