// @flow

import { call, put, takeLatest } from "redux-saga/effects";
import { readFile } from '../fs/fs';
import { FILE_SETTINGS } from '../constants/io';
import {
  APP_LOADING,
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
    const result = yield readFile(FILE_SETTINGS);

    console.log(result);
    
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
* Watches for APP_LOADED.
*/
export function* appWatcher(): Generator<void, void, void> {
  yield takeLatest(APP_LOADING, settingsWorker);
}