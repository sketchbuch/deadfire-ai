// @flow

/**
 * Reducers
 */
import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import app from './app';
import languages from './languages';
import settings from './settings';

export default combineReducers({
  app,
  languages,
  settings,
  toastr: toastrReducer,
});
