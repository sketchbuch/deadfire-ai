// @flow

import type { ActionObj } from '../types/action';
import type { EternityDataObj } from '../types/eternity';
import { ETERNITY_LOAD_SUCCESS } from '../constants/actionTypes';

export default function reducer(state: EternityDataObj[] = [], action: ActionObj) {
  switch (action.type) {
    case ETERNITY_LOAD_SUCCESS:
      if (action.payload && action.payload.ai) {
        return action.payload.ai;
      }
      break;

    default:
      return state;
  }

  return state;
}
