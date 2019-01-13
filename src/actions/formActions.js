// @flow

import type { ActionCreator } from '../types/action';
import { FORM_BUSY, FORM_ERROR, FORM_RESET, FORM_SUCCESS } from '../constants/actionTypes';

/**
 * Form Actions
 */

export function busy(formType: string): ActionCreator {
  return { type: FORM_BUSY, payment: { formType } };
}

export function error(formType: string, error: string): ActionCreator {
  return { type: FORM_ERROR, payment: { formType, error } };
}

export function reset(formType: string): ActionCreator {
  return { type: FORM_RESET, payment: { formType } };
}

export function success(formType: string): ActionCreator {
  return { type: FORM_SUCCESS, payment: { formType } };
}
