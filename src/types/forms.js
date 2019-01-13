// @flow

/**
 * Form type def.
 */

export const formsStates = {
  BUSY: 'busy',
  ERROR: 'error',
  RESET: 'reset',
  SUCCESS: 'success',
};

export type FormActionTypes = $Values<formsStates>;

export type FormsState = {
  busy: boolean,
  error: boolean,
  errorMsg: string,
  errorTitle: string,
  success: boolean,
};

const formsDefault: FormsState = {
  busy: false,
  error: false,
  errorMsg: '',
  errorTitle: '',
  success: false,
};

export default formsDefault;
