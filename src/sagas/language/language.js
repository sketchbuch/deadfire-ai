// @flow
import { put, select, takeLatest } from 'redux-saga/effects';
import {
  LANGUAGE_CHANGE,
  LANGUAGE_LOAD,
  LANGUAGE_LOAD_ERROR,
  LANGUAGE_LOAD_SUCCESS,
  SETTINGS_LOAD_SUCCESS,
} from '../../constants/actionTypes';
import * as appActions from '../../actions/appActions';
import type { FsObject } from '../../types/fsObject';
import type { Languages } from '../../types/lang';
import { readLangFile } from '../../fs';

export default function* languageWatcher() {
  yield [takeLatest(LANGUAGE_CHANGE, loadLanguageWorker), takeLatest(SETTINGS_LOAD_SUCCESS, loadLanguageWorker)];
}

function* loadLanguageWorker(action: ActionObj): Generator<*, *, *> {
  const isInitialLoad = action.type === SETTINGS_LOAD_SUCCESS;
  yield put({ type: LANGUAGE_LOAD });
  const lang: Languages = !isInitialLoad ? action.payload.language : yield select(state => state.languages.current);

  try {
    const result: FsObject = yield readLangFile(lang);

    if (result.success) {
      yield put({ type: LANGUAGE_LOAD_SUCCESS, payload: { language: lang, translations: result.data } });
      if (isInitialLoad) {
        yield put(appActions.loaded());
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
