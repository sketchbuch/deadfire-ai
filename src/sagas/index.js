// @flow

import { all, takeLatest } from "redux-saga/effects";
import {
  APP_LOADING,
  LANGUAGE_LOAD_SUCCESS,
  SETTINGS_LOAD_SUCCESS,
} from '../constants/actionTypes';
import settingsWorker from './settings'
import languageWorker from './language'
import dataWorker from './data'


/**
* Sagas
*/

/**
* Watches for APP_LOADED.
*/
export default function* appWatcher(): Generator<*, *, *> {
  yield all([
    takeLatest(APP_LOADING, settingsWorker),
    takeLatest(SETTINGS_LOAD_SUCCESS, languageWorker),
    takeLatest(LANGUAGE_LOAD_SUCCESS, dataWorker),
  ]);
}