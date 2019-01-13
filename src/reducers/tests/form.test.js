// @flow

import reducer from '../forms';
import formsDefault from '../../types/forms';
import { FORM_BUSY, FORM_RESET } from '../../constants/actionTypes';

/**
 * Forms Reducer Tests
 */

describe('Reducer: Forms', () => {
  const initialState = { ...formsDefault };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  test('FORM_BUSY should update the settings correctly', () => {
    const actionObj = { type: FORM_BUSY };
    const expectedState = { ...initialState, busy: true };
    expect(reducer(initialState, actionObj)).toEqual(expectedState);
  });

  test('FORM_RESET should update the settings correctly', () => {
    const actionObj = { type: FORM_RESET };
    expect(reducer(initialState, actionObj)).toEqual(initialState);
  });
});
