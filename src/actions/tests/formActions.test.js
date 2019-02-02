// @flow

import { FORM_BUSY, FORM_ERROR, FORM_RESET, FORM_SUCCESS } from '../../constants/actionTypes';
import * as formActions from '../formActions';

describe('Actions: FormActions:', () => {
  const formType = 'settings';
  test('busy() should set the busy status', () => {
    const EXPECTED_ACTION = { type: FORM_BUSY, payload: { formType } };
    expect(formActions.busy(formType)).toEqual(EXPECTED_ACTION);
  });

  test('error() should handle an error', () => {
    const EXPECTED_ACTION = { type: FORM_ERROR, payload: { formType } };
    expect(formActions.error(formType)).toEqual(EXPECTED_ACTION);
  });

  test('reset() should restore defaulr state', () => {
    const EXPECTED_ACTION = { type: FORM_RESET, payload: { formType } };
    expect(formActions.reset(formType)).toEqual(EXPECTED_ACTION);
  });

  test('success() should restore default state', () => {
    const EXPECTED_ACTION = { type: FORM_SUCCESS, payload: { formType } };
    expect(formActions.success(formType)).toEqual(EXPECTED_ACTION);
  });
});
