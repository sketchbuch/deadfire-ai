// @flow

import * as yup from 'yup';

/**
 * Validation scheme for settings.
 */
const settingsSchema = (context: string) => {
  const lang = yup
    .string()
    .trim()
    .required();

  if (context === 'submit') {
    return yup.object().shape({
      aiPath: yup
        .string()
        .trim()
        .required(),
      installPath: yup
        .string()
        .trim()
        .required(),
      lang,
    });
  }
  return yup.object().shape({
    aiPath: yup.string().trim(),
    installPath: yup.string().trim(),
    lang,
  });
};

export default settingsSchema;
