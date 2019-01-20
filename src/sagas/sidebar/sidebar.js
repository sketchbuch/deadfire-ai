// @flow

import { put, select, takeLatest } from 'redux-saga/effects';
import * as sidebarActions from '../../actions/sidebarActions';
import type { ActionObj } from '../../types/action';
import type { FsObject } from '../../types/fsObject';
import { SIDEBAR_LOADING } from '../../constants/actionTypes';
import { getAiFiles } from '../../fs';
import { trans } from '../../components/Translation/Translation';

export default function* sidebarWatcher() {
  yield [takeLatest(SIDEBAR_LOADING, loadSidebarWorker)];
}

function* loadSidebarWorker(action: ActionObj): Generator<*, *, *> {
  try {
    const aiPath: string = yield select(state => state.settings.aiPath);
    const result: FsObject = yield getAiFiles(aiPath);
    yield put(sidebarActions.success(action.payload.domain, result.data.files));
  } catch (error) {
    yield put(
      sidebarActions.error(action.payload.domain, { errorTitle: trans('Error', 'Persistence'), errorMsg: error })
    );
  }
}
