// @flow

import { all } from 'redux-saga/effects';
import aiscriptsWatcher from './aiscripts/aiscripts';
import appWatcher from './app/app';
import languageWatcher from './language/language';
import settingsWatcher from './settings/settings';
import sidebarWatcher from './sidebar/sidebar';

export default function* rootWatcher(action: ActionObj): Generator<*, *, *> {
  yield all([aiscriptsWatcher(), appWatcher(), languageWatcher(), settingsWatcher(), sidebarWatcher()]);
}
