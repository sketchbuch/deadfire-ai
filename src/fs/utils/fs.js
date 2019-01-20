// @flow

export const path = require('path');
export const Parser = require('binary-parser').Parser;
export const UUID = require('uuid-js');
export let electron = null;
export let fs = require('fs');

// If in electron environment:
if (window !== undefined && window.require) {
  electron = window.require('electron');
  fs = electron.remote.require('fs');
}

export const APP_PATH = electron !== null ? electron.remote.app.getAppPath() : '';
export const DATA_PATH = electron !== null ? electron.remote.app.getPath('userData') : '';
export const FOLDER = window.location.hostname === 'localhost' ? 'public' : 'build';
