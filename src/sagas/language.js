// @flow

import { put, select } from "redux-saga/effects";
import { readLangFile } from '../fs/fs';
import {
  LANGUAGE_LOAD,
  LANGUAGE_LOAD_ERROR,
  LANGUAGE_LOAD_SUCCESS,
} from '../constants/actionTypes';
import type { FsObject } from '../types/fsObject';
import type { LanguagesType } from '../types/lang';

/**
* Called when APP_LOADED intercepted.
*/
function* languageWorker(): Generator<*, *, *> {
  yield put({ type: LANGUAGE_LOAD });
  const lang: LanguagesType = yield select((state) => state.languages.current);

  try {
    const result: FsObject = yield readLangFile(lang);
    
    if (result.success) {
      yield put({ type: LANGUAGE_LOAD_SUCCESS, payload: result.data });
    } else {
      yield put({ type: LANGUAGE_LOAD_ERROR, payload: { error: result.errorObj } });
    }
  
  } catch (error) {
    yield put({ type: LANGUAGE_LOAD_ERROR, payload: { error }});
  }
}

export default languageWorker;