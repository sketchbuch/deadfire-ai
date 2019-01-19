// @flow

import { put, select, takeLatest } from 'redux-saga/effects';
import {
  APP_LOADING,
  SETTINGS_LOAD_ERROR,
  SETTINGS_UPDATE,
  SETTINGS_LOAD_SUCCESS,
  SETTINGS_UPDATE_ERROR,
} from '../../constants/actionTypes';
import * as appActions from '../../actions/appActions';
import * as settingsActions from '../../actions/settingsActions';
import type { ActionObj } from '../../types/action';
import type { FsObject } from '../../types/fsObject';
import type { SettingsState } from '../../types/settings';
import { FILE_SETTINGS } from '../../constants/io';
import { readDataFile, writeDataFile } from '../../fs/fs';
import { trans } from '../../components/Translation/Translation';

export default function* settingsWatcher() {
  yield [takeLatest(APP_LOADING, loadSettingsWorker), takeLatest(SETTINGS_UPDATE, updateSettingsWorker)];
}

function* loadSettingsWorker(action: ActionObj): Generator<*, *, *> {
  yield put(settingsActions.load());

  try {
    const result: FsObject = yield readDataFile(FILE_SETTINGS);

    if (result.wasCreated) {
      yield put(appActions.storageCreated());
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

function* updateSettingsWorker(action: ActionObj): Generator<*, *, *> {
  const settings: SettingsState = yield select(state => state.settings);

  try {
    const result: FsObject = yield writeDataFile(FILE_SETTINGS, settings);

    if (result.success) {
      yield put(settingsActions.updateSuccess());
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
