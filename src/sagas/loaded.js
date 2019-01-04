// @flow

import { put } from "redux-saga/effects";
import { getCustomNumProp } from '../utils/dom';
import { APP_LOADER_REMOVED } from '../constants/actionTypes';

/**
* Called when APP_LOADED intercepted.
*/
function* loadedWorker(action: ActionObj): Generator<*, *, *> {
  const alDuration = getCustomNumProp('--apploader-ms');
  document.getElementsByTagName('html')[0].classList.add('app-initialised');
  
  setTimeout(
    () => {
      let appLoaderEle = document && document.getElementById('apploader');
      if (appLoaderEle && appLoaderEle.parentNode) appLoaderEle.parentNode.removeChild(appLoaderEle);
    },
    alDuration,
  );

  yield put({ type: APP_LOADER_REMOVED });
}

export default loadedWorker;