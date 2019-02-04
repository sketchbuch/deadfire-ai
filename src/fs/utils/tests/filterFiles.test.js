// @flow

import filterFiles from '../filterFiles';

describe('filterFiles():', () => {
  const files = ['/test/file.json', '/test/test/file.json', '/test/file.bmp', '/test/file.js', 'file.json'];
  const expectedFiles = ['/test/file.json', '/test/test/file.json', 'file.json'];

  test('Returns matching files', () => {
    expect(filterFiles(files, '.json')).toEqual(expectedFiles);
  });

  test('Returns an empty array if no files match', () => {
    expect(filterFiles(files, '.jpeg')).toEqual([]);
  });

  test('Returns an empty array if files has zero length', () => {
    expect(filterFiles([], '.jpeg')).toEqual([]);
  });
});
