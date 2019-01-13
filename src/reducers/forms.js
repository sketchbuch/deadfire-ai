// @flow

import formsDefault from '../types/forms';
import type { ActionObj } from '../types/action';
import type { FormsState } from '../types/forms';
import { FORM_BUSY, FORM_ERROR, FORM_RESET, FORM_SUCCESS } from '../constants/actionTypes';

/**
 * Forms Reducer.
 */

export default function reducer(state: FormsState = formsDefault, action: ActionObj) {
  switch (action.type) {
    case FORM_BUSY:
      return { ...formsDefault, busy: true };

    case FORM_ERROR:
      return { ...formsDefault, error: true, errorMsg: action.payload.error };

    case FORM_RESET:
      return { ...formsDefault };

    case FORM_SUCCESS:
      return { ...formsDefault, success: true };

    default:
      return state;
  }
}