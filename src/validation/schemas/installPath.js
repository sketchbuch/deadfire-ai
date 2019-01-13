// @flow

import * as yup from 'yup';

/**
 * Validation scheme for the install path for PoE 2.
 */
const installPathSchema = yup
  .string()
  .trim()
  .required();

export default installPathSchema;
