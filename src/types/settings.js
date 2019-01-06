// @flow

/**
* Settings type def.
*/

export type SettingsState = {
  installPath: string,
  lang: string,
};

export type SettingsUpdate = {[string]: string | boolean };

const settingsDefault: SettingsState = {
  installPath: '',
  lang: '',
};

export default settingsDefault;
