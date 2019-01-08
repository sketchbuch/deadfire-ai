// @flow

import setTitle, { titleSep } from '../title';

/**
 * ID Tests
 */

describe('Util: Titles', () => {
  test('setTitle() should set the default title if no prefix provided', () => {
    setTitle();
    expect(window.document.title).toBe(window.app.translations.EN.App.Name);
  });

  test('setTitle() handles suffix correctly', () => {
    setTitle('Test');
    expect(window.document.title).toBe(window.app.translations.EN.App.Name + titleSep + 'Test');
    setTitle(' ');
    expect(window.document.title).toBe(window.app.translations.EN.App.Name);
  });
});
