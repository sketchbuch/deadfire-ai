// @flow

import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import aiscripts from './aiscripts';
import app from './app';
import eternityAbilities from './eternityAbilities';
import eternityAi from './eternityAi';
import eternityGui from './eternityGui';
import forms from './forms';
import languages from './languages';
import settings from './settings';
import sidebar from './sidebar';

export default combineReducers({
  aiscripts,
  app,
  eternityAbilities,
  eternityAi,
  eternityGui,
  forms,
  languages,
  settings,
  sidebar,
  toastr: toastrReducer,
});
