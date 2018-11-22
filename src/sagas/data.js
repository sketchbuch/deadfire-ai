// @flow

import { put } from "redux-saga/effects";
import { readEternityFile } from '../fs/fs';
import {
  DATA_LOAD,
  DATA_LOAD_ERROR,
  DATA_LOAD_SUCCESS,
} from '../constants/actionTypes';
import type { FsObject } from '../types/fsObject';

/**
* Called when APP_LOADED intercepted.
*/
function* dataWorker(): Generator<*, *, *> {
  yield put({ type: DATA_LOAD });

  try {
    const result: FsObject = yield readEternityFile();

    console.log(result);
    
    if (result.success) {
      yield put({ type: DATA_LOAD_SUCCESS, payload: result.data });
    } else {
      yield put({ type: DATA_LOAD_ERROR, payload: { error: result.errorObj } });
    }
  
  } catch (error) {
    yield put({ type: DATA_LOAD_ERROR, payload: { error }});
  }
}

export default dataWorker;