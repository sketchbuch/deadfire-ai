// @flow

import { all, takeLatest } from "redux-saga/effects";
import {
  APP_ERROR,
  APP_LOADED,
  APP_LOADING,
  DATA_LOAD_ERROR,
  LANGUAGE_LOAD_ERROR,
  LANGUAGE_LOAD_SUCCESS,
  SETTINGS_LOAD_ERROR,
  SETTINGS_LOAD_SUCCESS,
} from '../constants/actionTypes';
import loadedWorker from './loader'
import appErrorWorker from './appError'
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
      // App
    takeLatest(APP_LOADED, loadedWorker),
    takeLatest(APP_LOADING, settingsWorker),

      // Data
    takeLatest(DATA_LOAD_ERROR, appErrorWorker),

      // Language
    takeLatest(LANGUAGE_LOAD_ERROR, appErrorWorker),
    //takeLatest(LANGUAGE_LOAD_SUCCESS, dataWorker),

      // Settings
    takeLatest(SETTINGS_LOAD_ERROR, appErrorWorker),
    takeLatest(SETTINGS_LOAD_SUCCESS, languageWorker),
  ]);
}