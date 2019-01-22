// @flow

import { put, select, takeLatest } from 'redux-saga/effects';
import * as sidebarActions from '../../actions/sidebarActions';
import type { ActionObj } from '../../types/action';
import type { FsObject } from '../../types/fsObject';
import { SIDEBAR_LOADING } from '../../constants/actionTypes';
import { getAiFiles } from '../../fs';

export default function* sidebarWatcher() {
  yield [takeLatest(SIDEBAR_LOADING, loadSidebarWorker)];
}

function* loadSidebarWorker(action: ActionObj): Generator<*, *, *> {
  try {
    const aiPath: string = yield select(state => state.settings.aiPath);
    const result: FsObject = yield getAiFiles(aiPath);
    if (result.success) {
      //yield fork(loadAiFiles, aiPath, result.data.files);
      yield put(sidebarActions.success(action.payload.domain, result.data.files, aiPath));
    } else {
      yield put(
        sidebarActions.error(action.payload.domain, {
          errorTitle: 'loadSidebarWorker',
          errorMsg: result.errorObj.toString(),
        })
      );
    }
  } catch (error) {
    yield put(sidebarActions.error(action.payload.domain, { errorTitle: 'loadSidebarWorker', errorMsg: error }));
  }
}

/**
 * Triggers loading of an AI file.
 */
/* function* loadAiFiles(aiPath: string, fileList: string[]): Generator<*, *, *> {
  for (let file = 0; file < fileList.length; file++) {
    yield put({ type: AISCRIPT_LOADING, payload: { aiFile: aiPath + fileList[file] } });
  }
} */
