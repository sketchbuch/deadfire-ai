// @flow

import { put, select } from "redux-saga/effects";
import { writeDataFile } from '../fs/fs';
import { FILE_SETTINGS } from '../constants/io';
import {
  SETTINGS_UPDATE_ERROR,
  SETTINGS_UPDATE_SUCCESS,
} from '../constants/actionTypes';
import type { FsObject } from '../types/fsObject';
import type { ActionObj } from '../types/action';


/**
* Called when SETTINGS_UPDATE intercepted.
*/
function* settingsWorker(action: ActionObj): Generator<*, *, *> {
  const settings = yield select((state) => state.settings);

  try {
    const result: FsObject = yield writeDataFile(FILE_SETTINGS, settings);
    
    if (result.success) {
      yield put({ type: SETTINGS_UPDATE_SUCCESS });
    } else {
      yield put({ type: SETTINGS_UPDATE_ERROR, payload: { error: result.errorObj } });
    }
  
  } catch (error) {
    yield put({ type: SETTINGS_UPDATE_ERROR, payload: { error }});
  }
}

export default settingsWorker;