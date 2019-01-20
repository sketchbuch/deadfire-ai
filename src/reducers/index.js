// @flow

import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import aiscripts from './aiscripts';
import app from './app';
import forms from './forms';
import languages from './languages';
import settings from './settings';
import sidebar from './sidebar';

export default combineReducers({
  aiscripts,
  app,
  forms,
  languages,
  settings,
  sidebar,
  toastr: toastrReducer,
});
