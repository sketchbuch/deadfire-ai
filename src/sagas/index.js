// @flow

import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { readDataFile, readEternityFile, readLangFile } from '../fs/fs';
import { FILE_SETTINGS } from '../constants/io';
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