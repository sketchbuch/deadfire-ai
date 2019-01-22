// @flow

import { buffers } from 'redux-saga';
import { actionChannel, call, put, take } from 'redux-saga/effects';
import * as aiscriptActions from '../../actions/aiscriptActions.js';
import { AISCRIPT_LOADING } from '../../constants/actionTypes';
import { readAiFile } from '../../fs';

export default function* aiscriptsWatcher() {
  yield [watchAiscriptLoading()];
}

function* watchAiscriptLoading() {
  const requestChan = yield actionChannel(AISCRIPT_LOADING, buffers.expanding(1));
  while (true) {
    const { meta, payload } = yield take(requestChan);
    const result = yield call(readAiFile, payload.aiFile);

    if (result.success) {
      yield put(aiscriptActions.success(result.data.byteStructure, payload.id, meta.parseType));
    } else {
      yield put(aiscriptActions.error(payload.id, result.errorObj.toString()));
    }
  }
}
