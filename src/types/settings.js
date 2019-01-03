// @flow

/**
* Settings type def.
*/

export type Settings = {
  installPath: string,
  lang: string,
};

const settingsDefault: Settings = {
  installPath: '',
  lang: '',
};

export default settingsDefault;
