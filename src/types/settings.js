// @flow

/**
 * Settings type def.
 */

export type SettingsState = {
  aiPath: string,
  installPath: string,
  lang: string,
};

export type SettingsUpdate = { [string]: string | boolean };

const settingsDefault: SettingsState = {
  aiPath: '',
  installPath: '',
  lang: '',
};

export default settingsDefault;
