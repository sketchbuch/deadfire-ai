// @flow

import { LANGUAGE_CHANGE } from '../../constants/actionTypes';
import * as languageActions from '../languageActions';

describe('Actions: LangaugeActions:', () => {
  test('change() should dispatch the LANGUAGE_CHANGE action', () => {
    const LANG = 'DE';
    expect(languageActions.change(LANG)).toEqual({ type: LANGUAGE_CHANGE, payload: { language: LANG } });
  });
});
