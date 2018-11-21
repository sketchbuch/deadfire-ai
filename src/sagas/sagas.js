// @flow

import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { readDataFile, readLangFile } from '../fs/fs';
import { FILE_SETTINGS } from '../constants/io';
import {
  APP_LOADING,
  LANGUAGE_LOAD,
  LANGUAGE_LOAD_ERROR,
  LANGUAGE_LOAD_SUCCESS,
  SETTINGS_LOAD,
  SETTINGS_LOAD_ERROR,
  SETTINGS_LOAD_SUCCESS,
} from '../constants/actionTypes';


/**
* Sagas
*/

/**
* Called when APP_LOADED intercepted.
*/
function* settingsWorker() {
  yield put({ type: SETTINGS_LOAD });

  try {
    const result = yield readDataFile(FILE_SETTINGS);
    
    if (result.success) {
      yield put({ type: SETTINGS_LOAD_SUCCESS, payload: result.data });
    } else {
      yield put({ type: SETTINGS_LOAD_ERROR, payload: { error: result.errorObj } });
    }
  
  } catch (error) {
    yield put({ type: SETTINGS_LOAD_ERROR, payload: { error }});
  }
}

/**
* Called when SETTINGS_LOAD_SUCCESS intercepted.
*/
function* languageWorker() {
  yield put({ type: LANGUAGE_LOAD });
  const lang = yield select((state) => state.languages.current);

  try {
    const result = yield readLangFile(lang);
    
    if (result.success) {
      yield put({ type: LANGUAGE_LOAD_SUCCESS, payload: result.data });
    } else {
      yield put({ type: LANGUAGE_LOAD_ERROR, payload: { error: result.errorObj } });
    }
  
  } catch (error) {
    yield put({ type: LANGUAGE_LOAD_ERROR, payload: { error }});
  }
}


/**
* Watches for APP_LOADED.
*/
export function* appWatcher(): Generator<void, void, void> {
  yield all([
    takeLatest(APP_LOADING, settingsWorker),
    takeLatest(SETTINGS_LOAD_SUCCESS, languageWorker),
  ]);
}