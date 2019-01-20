// @flow

import formsDefault from '../types/forms';
import type { ActionObj } from '../types/action';
import type { FormsState } from '../types/forms';
import {
  FORM_BUSY,
  FORM_ERROR,
  FORM_RESET,
  FORM_SUCCESS,
  SETTINGS_SAVE_ERROR,
  SETTINGS_SAVE_SUCCESS,
} from '../constants/actionTypes';

export default function reducer(state: FormsState = formsDefault, action: ActionObj) {
  switch (action.type) {
    case FORM_BUSY:
      return { ...formsDefault, busy: true };

    case FORM_RESET:
      return { ...formsDefault };

    case FORM_ERROR:
    case SETTINGS_SAVE_ERROR:
      return { ...formsDefault, ...action.payload, error: true };

    case FORM_SUCCESS:
    case SETTINGS_SAVE_SUCCESS:
      return { ...formsDefault, success: true };

    default:
      return state;
  }
}
