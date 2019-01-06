// @flow

import { langs } from '../reducers/languages';


/**
* Language type def.
*/

export type Lang = {
  key: string,
  label: string,
};

export type Languages = $Keys<typeof langs>