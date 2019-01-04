// @flow

/**
* Settings type def.
*/

export type Settings = {
  installPath: string,
  lang: string,
};

export type SettingsUpdate = {[string]: string | boolean };

const settingsDefault: Settings = {
  installPath: '',
  lang: '',
};

export default settingsDefault;
