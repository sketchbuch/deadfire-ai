// @flow

import type { ActionCreator } from '../types/action';
import { FORM_BUSY, FORM_ERROR, FORM_RESET, FORM_SUCCESS } from '../constants/actionTypes';

export function busy(formType: string): ActionCreator {
  return { type: FORM_BUSY, payload: { formType } };
}

export function error(formType: string, errorTitle: string, errorMsg: string): ActionCreator {
  return { type: FORM_ERROR, payload: { formType, errorTitle, errorMsg } };
}

export function reset(formType: string): ActionCreator {
  return { type: FORM_RESET, payload: { formType } };
}

export function success(formType: string): ActionCreator {
  return { type: FORM_SUCCESS, payload: { formType } };
}
