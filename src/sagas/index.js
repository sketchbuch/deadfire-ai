// @flow

import { all, takeLatest } from 'redux-saga/effects';
import {
  APP_LOADED,
  APP_LOADING,
  DATA_LOAD_ERROR,
  LANGUAGE_LOAD_ERROR,
  LANGUAGE_CHANGE,
  SETTINGS_LOAD_ERROR,
  SETTINGS_LOAD_SUCCESS,
  SETTINGS_UPDATE,
} from '../constants/actionTypes';
import appLoadedWorker from './appLoaded';
import appErrorWorker from './appError';
import loadSettingsWorker from './loadSettings';
import updateSettingsWorker from './updateSettings';
import languageWorker from './loadLanguage';

/**
 * Sagas
 *

/**
 * Watches for dispatched actions.
 */
export default function* appWatcher(action: ActionObj): Generator<*, *, *> {
  yield all([
    // App
    takeLatest(APP_LOADED, appLoadedWorker),
    takeLatest(APP_LOADING, loadSettingsWorker),

    // Data
    takeLatest(DATA_LOAD_ERROR, appErrorWorker),

    // Language
    takeLatest(LANGUAGE_CHANGE, languageWorker),
    takeLatest(LANGUAGE_LOAD_ERROR, appErrorWorker),
    //takeLatest(LANGUAGE_LOAD_SUCCESS, dataWorker),

    // Settings
    takeLatest(SETTINGS_LOAD_ERROR, appErrorWorker),
    takeLatest(SETTINGS_LOAD_SUCCESS, languageWorker),
    takeLatest(SETTINGS_UPDATE, updateSettingsWorker),
  ]);
}
