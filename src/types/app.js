// @flow

/**
 * App type def.
 */

export type AppState = {
  error: boolean,
  errorMsg: string,
  installPathSet: boolean,
  loaded: boolean,
  loading: boolean,
  menuExpanded: boolean,
  storageCreated: boolean,
};

const appDefault: AppState = {
  error: false,
  errorMsg: '',
  installPathSet: false,
  loaded: false,
  loading: true,
  menuExpanded: false,
  storageCreated: false,
};

export default appDefault;
