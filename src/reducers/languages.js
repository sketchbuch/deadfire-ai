// @flow

import { SETTINGS_LOAD_SUCCESS } from '../constants/actionTypes';
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
  switch (action.type) {
    case SETTINGS_LOAD_SUCCESS:
      let reqLang = '';
      const { payload }: Object = action;

      if (payload.settings !== undefined && payload.settings.language !== undefined) {
        reqLang = payload.settings.language;
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

    default:
      return state;
  }

  return state;
}
