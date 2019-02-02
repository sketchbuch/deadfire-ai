// @flow

import {
  AISCRIPT_LOADING,
  AISCRIPT_LOADING_ERROR,
  AISCRIPT_LOADING_SUCCESS,
  AISCRIPT_SET_FULL_PARSING,
  AISCRIPT_SET_QUICK_PARSING,
} from '../../constants/actionTypes';
import * as aiscriptActions from '../aiscriptActions';
import aiscriptDefault, { factory } from '../../types/aiscript';
import byteStructureDefault from '../../types/byteStructure';
import { PARSE_STATE_FULL, PARSE_STATE_QUICK } from '../../constants/misc';

describe('Actions: AiscriptActions:', () => {
  const ts = Date.now();
  const aiscript = factory({ ...aiscriptDefault, label: 'Fighter 1' }, ts);

  test('loadError() should dispatch the AISCRIPT_LOADING_ERROR action', () => {
    const id = aiscript.id;
    const parseErrorMsg = 'An error occured';
    const parseErrorStack = 'Test stack';
    const expectedAction = {
      type: AISCRIPT_LOADING_ERROR,
      payload: { id, parseErrorMsg, parseErrorStack },
    };

    expect(aiscriptActions.loadError(id, parseErrorMsg, parseErrorStack)).toEqual(expectedAction);
  });

  test('loadSuccess() should dispatch the AISCRIPT_LOADING_SUCCESS action', () => {
    const byteStructure = { ...byteStructureDefault };
    const id = aiscript.id;
    const parseState = PARSE_STATE_QUICK;
    const expectedAction = {
      type: AISCRIPT_LOADING_SUCCESS,
      payload: { byteStructure, id, parseState },
    };

    expect(aiscriptActions.loadSuccess(byteStructure, id, parseState)).toEqual(expectedAction);
  });

  test('loadQuick() should dispatch the AISCRIPT_LOADING action', () => {
    const id = aiscript.id;
    const aiFile = aiscript.filePath + aiscript.fileName;
    const expectedAction = {
      type: AISCRIPT_LOADING,
      payload: { aiFile, id },
      meta: { parseType: PARSE_STATE_QUICK },
    };

    expect(aiscriptActions.loadQuick(aiscript)).toEqual(expectedAction);
  });

  test('loadFull() should dispatch the AISCRIPT_LOADING action', () => {
    const id = aiscript.id;
    const aiFile = aiscript.filePath + aiscript.fileName;
    const expectedAction = {
      type: AISCRIPT_LOADING,
      payload: { aiFile, id },
      meta: { parseType: PARSE_STATE_FULL },
    };

    expect(aiscriptActions.loadFull(aiscript)).toEqual(expectedAction);
  });

  test('setQuickParsing() should dispatch the AISCRIPT_SET_QUICK_PARSING action', () => {
    const aiScripts = [aiscript];
    const expectedAction = {
      type: AISCRIPT_SET_QUICK_PARSING,
      payload: { aiScripts },
    };

    expect(aiscriptActions.setQuickParsing(aiScripts)).toEqual(expectedAction);
  });

  test('setFullParsing() should dispatch the AISCRIPT_SET_FULL_PARSING action', () => {
    const aiScripts = [aiscript];
    const expectedAction = {
      type: AISCRIPT_SET_FULL_PARSING,
      payload: { aiScripts },
    };

    expect(aiscriptActions.setFullParsing(aiScripts)).toEqual(expectedAction);
  });
});
