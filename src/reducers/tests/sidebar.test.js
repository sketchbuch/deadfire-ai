// @flow

import reducer from '../sidebar';
import sidebarDefault from '../../types/sidebar';
import { SIDEBAR_LOADING } from '../../constants/actionTypes';

describe('Reducer: Sidebar', () => {
  const initialState = { ...sidebarDefault };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  test('SIDEBAR_LOADING should set loading to true', () => {
    const actionObj = { type: SIDEBAR_LOADING };
    expect(reducer(initialState, actionObj)).toEqual({ ...initialState, loading: true });
  });
});
