// @flow

import { buffers } from 'redux-saga';
import { actionChannel, call, put, take } from 'redux-saga/effects';
import * as aiscriptActions from '../../actions/aiscriptActions.js';
import { AISCRIPT_LOADING, AISCRIPT_SET_PARSING } from '../../constants/actionTypes';
import { readAiFile } from '../../fs';

export default function* aiscriptsWatcher() {
  yield [watchAiscriptParsing(), watchAiscriptLoading()];
}

function* watchAiscriptParsing() {
  const requestChan = yield actionChannel(AISCRIPT_SET_PARSING, buffers.expanding(1));
  while (true) {
    const { payload } = yield take(requestChan);
    for (let index = 0; index < payload.aiScripts.length; index++) {
      yield put(aiscriptActions.loadQuick(payload.aiScripts[index]));
    }
  }
}

function* watchAiscriptLoading() {
  const requestChan = yield actionChannel(AISCRIPT_LOADING, buffers.expanding(1));
  while (true) {
    const { meta, payload } = yield take(requestChan);
    const result = yield call(readAiFile, payload.aiFile);

    if (result.success) {
      yield put(aiscriptActions.loadSuccess(result.data.byteStructure, payload.id, meta.parseType));
    } else {
      yield put(aiscriptActions.loadError(payload.id, result.errorObj.toString()));
    }
  }
}
