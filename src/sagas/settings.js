// @flow

import { put, select } from 'redux-saga/effects';
import type { ActionObj } from '../types/action';
import type { FsObject } from '../types/fsObject';
import { FILE_SETTINGS } from '../constants/io';
import { SETTINGS_UPDATE_ERROR, SETTINGS_UPDATE_SUCCESS } from '../constants/actionTypes';
import { trans } from '../components/Translation/Translation';
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
    } else {
      yield put({
        type: SETTINGS_UPDATE_ERROR,
        payload: { errorTitle: trans('Error', 'Persistence'), errorMsg: result.errorObj },
      });
    }
  } catch (error) {
    yield put({ type: SETTINGS_UPDATE_ERROR, payload: { errorTitle: trans('Error', 'Persistence'), errorMsg: error } });
  }
}

export default settingsWorker;
