// @flow

import { put, select } from 'redux-saga/effects';
import { readLangFile } from '../fs/fs';
import {
  APP_LOADED,
  LANGUAGE_CHANGE,
  LANGUAGE_LOAD,
  LANGUAGE_LOAD_ERROR,
  LANGUAGE_LOAD_SUCCESS,
  SETTINGS_LOAD_SUCCESS,
} from '../constants/actionTypes';
import type { FsObject } from '../types/fsObject';
import type { Languages } from '../types/lang';

/**
 * Called when SETTINGS_LOAD_SUCCESS or LANGUAGE_CHANGE intercepted.
 */
function* loadLanguageWorker(action: ActionObj): Generator<*, *, *> {
  yield put({ type: LANGUAGE_LOAD });
  const lang: Languages =
    action.type === LANGUAGE_CHANGE ? action.payload.language : yield select(state => state.languages.current);

  try {
    const result: FsObject = yield readLangFile(lang);

    if (result.success) {
      yield put({ type: LANGUAGE_LOAD_SUCCESS, payload: { language: lang, translations: result.data } });
      if (action.type === SETTINGS_LOAD_SUCCESS) {
        yield put({ type: APP_LOADED });
      }
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
