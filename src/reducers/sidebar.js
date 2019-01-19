// @flow

import { SIDEBAR_LOADED, SIDEBAR_LOADING } from '../constants/actionTypes';
import type { ActionObj } from '../types/action';
import type { SidebarState } from '../types/sidebar';
import sidebarDefault from '../types/sidebar';

/**
 * Sidebar Reducer.
 */

export default function reducer(state: SidebarState = sidebarDefault, action: ActionObj) {
  switch (action.type) {
    case SIDEBAR_LOADED:
      return { ...state, loading: false };

    case SIDEBAR_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
}
