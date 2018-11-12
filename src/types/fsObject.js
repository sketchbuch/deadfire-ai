// @flow

/**
* FS result return type def.
*/

export type FsObject = {
  errorObj: ?Error,
  success: boolean,
  data?: {},
};