// @flow

import * as formActions from '../formActions';
import { FORM_BUSY, FORM_ERROR, FORM_RESET, FORM_SUCCESS } from '../../constants/actionTypes';

/**
 * Form Actions Tests
 */

describe('Actions: FormActions:', () => {
  const formType = 'settings';
  test('busy() should set the busy status', () => {
    const EXPECTED_ACTION = { type: FORM_BUSY, payment: { formType } };
    expect(formActions.busy(formType)).toEqual(EXPECTED_ACTION);
  });

  test('error() should handle an error', () => {
    const EXPECTED_ACTION = { type: FORM_ERROR, payment: { formType } };
    expect(formActions.error(formType)).toEqual(EXPECTED_ACTION);
  });

  test('reset() should restore defaulr state', () => {
    const EXPECTED_ACTION = { type: FORM_RESET, payment: { formType } };
    expect(formActions.reset(formType)).toEqual(EXPECTED_ACTION);
  });

  test('success() should restore default state', () => {
    const EXPECTED_ACTION = { type: FORM_SUCCESS, payment: { formType } };
    expect(formActions.success(formType)).toEqual(EXPECTED_ACTION);
  });
});
