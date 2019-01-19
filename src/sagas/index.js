// @flow

import { all } from 'redux-saga/effects';
import appWatcher from './app/app';
import languageWatcher from './language/language';
import sidebarWatcher from './sidebar/sidebar';
import settingsWatcher from './settings/settings';

export default function* rootWatcher(action: ActionObj): Generator<*, *, *> {
  yield all([appWatcher(), languageWatcher(), settingsWatcher(), sidebarWatcher()]);
}
