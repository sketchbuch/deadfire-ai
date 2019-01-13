// @flow

import { put, select } from 'redux-saga/effects';
import * as formActions from '../actions/formActions';
import type { ActionObj } from '../types/action';
import type { FsObject } from '../types/fsObject';
import { FILE_SETTINGS } from '../constants/io';
import { SETTINGS_UPDATE_ERROR, SETTINGS_UPDATE_SUCCESS } from '../constants/actionTypes';
import { writeDataFile } from '../fs/fs';

/**
 * Called when SETTINGS_UPDATE intercepted.
 */
function* settingsWorker(action: ActionObj): Generator<*, *, *> {
  const settings = yield select(state => state.settings);

  try {
    const result: FsObject = yield writeDataFile(FILE_SETTINGS, settings);

    if (result.success) {
      yield put({ type: SETTINGS_UPDATE_SUCCESS });
      yield put(formActions.success('settings'));
    } else {
      yield put({
        type: SETTINGS_UPDATE_ERROR,
        payload: { error: result.errorObj },
      });
      yield put(formActions.error('settings'));
    }
  } catch (error) {
    yield put({ type: SETTINGS_UPDATE_ERROR, payload: { error } });
  }
}

export default settingsWorker;
