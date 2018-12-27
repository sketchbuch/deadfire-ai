// @flow

/**
* App type def.
*/

export type AppType = {
  error: boolean,
  errorMsg: string,
  loaded: boolean,
  loading: boolean,
  storageCreated: boolean,
};

const appDefault: AppType = {
  error: false,
  errorMsg: '',
  loaded: false,
  loading: true,
  storageCreated: false,
};

export default appDefault;
