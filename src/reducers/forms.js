// @flow

import formsDefault from '../types/forms';
import type { ActionObj } from '../types/action';
import type { FormsState } from '../types/forms';
import {
  FORM_BUSY,
  FORM_ERROR,
  FORM_RESET,
  FORM_SUCCESS,
  SETTINGS_UPDATE_ERROR,
  SETTINGS_UPDATE_SUCCESS,
} from '../constants/actionTypes';

/**
 * Forms Reducer.
 */

export default function reducer(state: FormsState = formsDefault, action: ActionObj) {
  switch (action.type) {
    case FORM_BUSY:
      return { ...formsDefault, busy: true };

    case FORM_RESET:
      return { ...formsDefault };

    case FORM_ERROR:
    case SETTINGS_UPDATE_ERROR:
      const newState = { ...formsDefault, error: true };

      if (action.payload.errorMsg) {
        newState.errorMsg = action.payload.errorMsg;
      }
      if (action.payload.errorTitle) {
        newState.errorTitle = action.payload.errorTitle;
      }
      return newState;

    case FORM_SUCCESS:
    case SETTINGS_UPDATE_SUCCESS:
      return { ...formsDefault, success: true };

    default:
      return state;
  }
}
