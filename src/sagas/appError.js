// @flow

import { put } from "redux-saga/effects";
import {
  APP_ERROR,
  APP_LOADED,
} from '../constants/actionTypes';

/**
* Called when APP_ERROR intercepted.
*/
function* appErrorWorker(action: ActionObj): Generator<*, *, *> {
  yield put({ type: APP_ERROR });
  yield put({ type: APP_LOADED });
}

export default appErrorWorker;