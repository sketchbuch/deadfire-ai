// @flow

import { SIDEBAR_LOADING, SIDEBAR_LOADING_ERROR, SIDEBAR_LOADING_SUCCESS } from '../constants/actionTypes';
import type { ActionObj } from '../types/action';
import type { SidebarState } from '../types/sidebar';
import sidebarDefault from '../types/sidebar';

export default function reducer(state: SidebarState = sidebarDefault, action: ActionObj) {
  switch (action.type) {
    case SIDEBAR_LOADING:
      return { ...state, loading: true };

    case SIDEBAR_LOADING_ERROR:
      return { ...state, error: true, loading: false };

    case SIDEBAR_LOADING_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
}
