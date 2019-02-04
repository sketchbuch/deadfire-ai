// @flow

import getDataPath from '../getDataPath';

describe('getDataPath():', () => {
  test('Returns the correct path', () => {
    const FILE_PATH = 'test/file';
    expect(getDataPath(FILE_PATH)).toEqual('/Storage/' + FILE_PATH + '.json');
  });
});
