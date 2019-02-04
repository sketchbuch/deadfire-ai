// @flow

import { langs } from '../reducers/languages';

export type Lang = {
  key: string,
  label: string,
};

export type LangOption = {
  value: string,
  label: string,
};

export type Languages = $Keys<typeof langs>;
