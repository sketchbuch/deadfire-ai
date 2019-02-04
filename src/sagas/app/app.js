// @flow
import { put, takeLatest } from 'redux-saga/effects';
import * as appActions from '../../actions/appActions';
import { APP_LOADED, ETERNITY_LOAD_ERROR, LANGUAGE_LOAD_ERROR, SETTINGS_LOAD_ERROR } from '../../constants/actionTypes';
import { getCustomNumProp } from '../../utils';

export default function* appWatcher() {
  yield [
    takeLatest(APP_LOADED, appLoadedWorker),
    takeLatest(ETERNITY_LOAD_ERROR, appErrorWorker),
    takeLatest(LANGUAGE_LOAD_ERROR, appErrorWorker),
    takeLatest(SETTINGS_LOAD_ERROR, appErrorWorker),
  ];
}

function* appErrorWorker(action: ActionObj): Generator<*, *, *> {
  yield put(appActions.error());
  yield put(appActions.loaded());
}

function* appLoadedWorker(action: ActionObj): Generator<*, *, *> {
  const alDuration = getCustomNumProp('--apploader-ms');
  document.getElementsByTagName('html')[0].classList.add('app-initialised');

  setTimeout(() => {
    let appLoaderEle = document && document.getElementById('apploader');
    if (appLoaderEle && appLoaderEle.parentNode) {
      appLoaderEle.parentNode.removeChild(appLoaderEle);
    }
  }, alDuration);

  yield put(appActions.loaderRemoved());
}
