// @flow

import { SIDEBAR_LOADING_SUCCESS } from '../constants/actionTypes';
import type { ActionObj } from '../types/action';
import type { Aiscript } from '../types/aiscript';
import type { AiscriptObj } from '../types/aiscript';
import aiscriptDefault, { factory } from '../types/aiscript';

export default function reducer(state: Aiscript[] = [], action: ActionObj) {
  switch (action.type) {
    case SIDEBAR_LOADING_SUCCESS:
      console.log('AI Script Reducer');
      if (action.payload.domain === 'scripts') {
        if (action.payload.files !== undefined) {
          const newState = [];
          action.payload.files.forEach((file: AiscriptObj) => {
            const label = !file.parseError ? file.byteStructure.Name : file.fileName;
            newState.push(
              factory(
                { ...aiscriptDefault, byteStructure: { ...file.byteStructure }, fileName: file.fileName, label },
                Date.now()
              )
            );
          });
          return newState;
        }
      }
      break;

    default:
      return state;
  }
  return state;
}
