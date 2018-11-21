// @flow

import { langs } from '../reducers/languages';


/**
* Language type def.
*/

export type LangType = {
  key: string,
  label: string,
};

export type LanguagesType = $Keys<typeof langs>