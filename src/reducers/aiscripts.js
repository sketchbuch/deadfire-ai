// @flow

import aiscriptDefault, { factory } from '../types/aiscript';
import reduce from '../utils/reducers';
import type { ActionObj } from '../types/action';
import type { Aiscript } from '../types/aiscript';
import type { AiscriptObj } from '../types/aiscript';
import { AISCRIPT_LOADING_ERROR, AISCRIPT_LOADING_SUCCESS, SIDEBAR_LOADING_SUCCESS } from '../constants/actionTypes';
import { PARSE_STATE_ERROR } from '../constants/misc';

export default function reducer(state: Aiscript[] = [], action: ActionObj) {
  const { payload } = action;
  let item = undefined;

  switch (action.type) {
    case SIDEBAR_LOADING_SUCCESS:
      if (payload.domain === 'scripts') {
        if (payload.files !== undefined) {
          const newState = [];
          payload.files.forEach((file: AiscriptObj) => {
            newState.push(
              factory({ ...aiscriptDefault, fileName: file, filePath: payload.aiPath, label: file }, Date.now())
            );
          });
          return newState;
        }
      }
      break;

    case AISCRIPT_LOADING_ERROR:
      item = state.find((aiscript: Aiscript) => aiscript.id === payload.id);
      if (item !== undefined) {
        return reduce.arr.updateObj(state, {
          ...item,
          parseErrorMsg: payload.parseErrorMsg,
          parseState: PARSE_STATE_ERROR,
          parsing: false,
        });
      }

      break;

    case AISCRIPT_LOADING_SUCCESS:
      item = state.find((aiscript: Aiscript) => aiscript.id === payload.id);
      if (item !== undefined) {
        return reduce.arr.updateObj(state, {
          ...item,
          byteStructure: payload.byteStructure,
          label: payload.byteStructure.Name,
          parseState: payload.parseState,
          parsing: false,
        });
      }

      break;

    default:
      return state;
  }
  return state;
}