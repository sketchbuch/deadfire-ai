// @flow

import { put, takeLatest } from 'redux-saga/effects';
import { SIDEBAR_LOADING } from '../../constants/actionTypes';
import * as sidebarActions from '../../actions/sidebarActions';
import type { ActionObj } from '../../types/action';

export default function* sidebarWatcher() {
  yield [takeLatest(SIDEBAR_LOADING, loadSidebarWorker)];
}

function* loadSidebarWorker(action: ActionObj): Generator<*, *, *> {
  yield put(sidebarActions.loaded());
}
