// @flow

import { LANGUAGE_CHANGE } from '../constants/actionTypes';
import type { Languages } from '../types/lang';
import type { ActionCreator } from '../types/action';

/**
 * Language Actions
 */

export function change(language: Languages): ActionCreator {
  return { type: LANGUAGE_CHANGE, payload: { language } };
}
