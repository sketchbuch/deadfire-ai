// @flow

import type { ActionCreator } from '../types/action';
import type { Aiscript } from '../../types/aiscript';
import type { ByteStructure } from '../../types/byteStructure';
import type { ParseStates } from '../../types/aiscript';
import { PARSE_STATE_FULL, PARSE_STATE_QUICK } from '../constants/misc';
import {
  AISCRIPT_LOADING,
  AISCRIPT_LOADING_ERROR,
  AISCRIPT_LOADING_SUCCESS,
  AISCRIPT_SET_FULL_PARSING,
  AISCRIPT_SET_QUICK_PARSING,
} from '../constants/actionTypes';

export function loadError(id: string, parseErrorMsg: string, parseErrorStack?: string = ''): ActionCreator {
  return { type: AISCRIPT_LOADING_ERROR, payload: { id, parseErrorMsg, parseErrorStack } };
}

export function loadSuccess(byteStructure: ByteStructure, id: string, parseState: ParseStates): ActionCreator {
  return { type: AISCRIPT_LOADING_SUCCESS, payload: { byteStructure, id, parseState } };
}

export function loadQuick(aiScript: Aiscript): ActionCreator {
  return {
    type: AISCRIPT_LOADING,
    payload: { aiFile: aiScript.filePath + aiScript.fileName, id: aiScript.id },
    meta: { parseType: PARSE_STATE_QUICK },
  };
}

export function loadFull(aiScript: Aiscript): ActionCreator {
  return {
    type: AISCRIPT_LOADING,
    payload: { aiFile: aiScript.filePath + aiScript.fileName, id: aiScript.id },
    meta: { parseType: PARSE_STATE_FULL },
  };
}

export function setQuickParsing(aiScripts: Aiscript[]): ActionCreator {
  return {
    type: AISCRIPT_SET_QUICK_PARSING,
    payload: { aiScripts },
  };
}

export function setFullParsing(aiScripts: Aiscript[]): ActionCreator {
  return {
    type: AISCRIPT_SET_FULL_PARSING,
    payload: { aiScripts },
  };
}
