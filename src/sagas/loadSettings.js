// @flow

import { put } from 'redux-saga/effects';
import { readDataFile } from '../fs/fs';
import { FILE_SETTINGS } from '../constants/io';
import {
  APP_STORAGE_CREATED,
  SETTINGS_LOAD,
  SETTINGS_LOAD_ERROR,
  SETTINGS_LOAD_SUCCESS,
} from '../constants/actionTypes';
import type { FsObject } from '../types/fsObject';

/**
 * Called when APP_LOADING intercepted.
 */
function* loadSettingsWorker(action: ActionObj): Generator<*, *, *> {
  yield put({ type: SETTINGS_LOAD });

  try {
    const result: FsObject = yield readDataFile(FILE_SETTINGS);

    if (result.wasCreated) {
      yield put({ type: APP_STORAGE_CREATED });
    }

    if (result.success) {
      yield put({ type: SETTINGS_LOAD_SUCCESS, payload: result.data });
    } else {
      yield put({
        type: SETTINGS_LOAD_ERROR,
        payload: { error: result.errorObj },
      });
    }
  } catch (error) {
    yield put({ type: SETTINGS_LOAD_ERROR, payload: { error } });
  }
}

export default loadSettingsWorker;
