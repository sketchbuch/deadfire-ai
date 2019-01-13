// @flow

import { LANGUAGE_LOAD_SUCCESS, SETTINGS_LOAD_SUCCESS } from '../constants/actionTypes';
import type { ActionObj } from '../types/action';

export const langs = {
  EN: 'English',
  DE: 'Deutsch',
};

type initialState = {
  available: {},
  current: string,
  default: string,
};

const defaultState = {
  available: { ...langs },
  current: 'EN',
  default: 'EN',
};

/**
 * Languages Reducer.
 */
export default function reducer(state: initialState = defaultState, action: ActionObj) {
  const { payload }: Object = action;

  switch (action.type) {
    case SETTINGS_LOAD_SUCCESS:
      let reqLang = '';

      if (payload !== undefined && payload.lang !== undefined) {
        reqLang = payload.lang;
      }

      if (reqLang !== '') {
        const langFound = Object.keys(state.available).find(lang => lang === reqLang);

        if (langFound) {
          return {
            ...state,
            available: { ...state.available },
            current: langFound,
          };
        }
      }
      break;

    case LANGUAGE_LOAD_SUCCESS:
      window.app.translations[payload.language] = payload.translations[payload.language];
      window.app.current = payload.language;
      console.log('LANGUAGE_LOAD_SUCCESS');

      return {
        ...state,
        available: { ...state.available },
        current: payload.language,
      };

    default:
      return state;
  }

  return state;
}
