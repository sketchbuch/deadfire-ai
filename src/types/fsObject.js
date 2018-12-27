// @flow

/**
* FS result return type def.
*/

export type FsObject = {
  data?: {},
  errorObj: ?Error,
  success: boolean,
  wasCreated: boolean,
};