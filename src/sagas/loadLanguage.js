// @flow

import { put, select } from 'redux-saga/effects';
import { readLangFile } from '../fs/fs';
import { APP_LOADED, LANGUAGE_LOAD, LANGUAGE_LOAD_ERROR, LANGUAGE_LOAD_SUCCESS } from '../constants/actionTypes';
import type { FsObject } from '../types/fsObject';
import type { LanguagesType } from '../types/lang';

/**
 * Called when SETTINGS_LOAD_SUCCESS intercepted.
 */
function* loadLanguageWorker(action: ActionObj): Generator<*, *, *> {
  yield put({ type: LANGUAGE_LOAD });
  const lang: LanguagesType = yield select(state => state.languages.current);

  try {
    const result: FsObject = yield readLangFile(lang);

    if (result.success) {
      yield put({ type: LANGUAGE_LOAD_SUCCESS, payload: result.data });
      yield put({ type: APP_LOADED });
    } else {
      yield put({
        type: LANGUAGE_LOAD_ERROR,
        payload: { error: result.errorObj },
      });
    }
  } catch (error) {
    yield put({ type: LANGUAGE_LOAD_ERROR, payload: { error } });
  }
}

export default loadLanguageWorker;
