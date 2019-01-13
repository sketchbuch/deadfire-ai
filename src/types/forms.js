// @flow

/**
 * Form type def.
 */

export const fat = {
  BUSY: 'busy',
  ERROR: 'error',
  RESET: 'reset',
  SUCCESS: 'success',
};

export type FormActionTypes = $Values<fat>;

export type FormsState = {
  busy: boolean,
  error: boolean,
  errorMsg: string,
  success: boolean,
};

const formsDefault: FormsState = {
  busy: false,
  error: false,
  errorMsg: '',
  success: false,
};

export default formsDefault;
