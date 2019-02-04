// @flow

import getLanguagePath from '../getLanguagePath';

describe('getLanguagePath():', () => {
  test('Returns the correct path', () => {
    const LANG = 'EN';
    expect(getLanguagePath(LANG)).toEqual('/public/data/translations_' + LANG + '.json');
  });
});
