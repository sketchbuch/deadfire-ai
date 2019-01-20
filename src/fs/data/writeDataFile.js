// @flow

import type { FsObject } from '../,,/types/fsObject';
import { fs } from '../utils/fs';
import getDataPath from '../utils/getDataPath';

/**
 * Writes a file async. to the filesystem. callback receives an FsObject.
 */
export default function writeDataFile(fileName: string, content: object): Promise<FsObject> {
  return new Promise((resolve, reject) => {
    const FILE_PATH = getDataPath(fileName);

    fs.writeFile(FILE_PATH, JSON.stringify(content), 'UTF-8', (err: ?Error) => {
      if (err) {
        reject({
          errorObj: err,
          success: false,
        });
      } else {
        resolve({
          errorObj: err,
          success: true,
        });
      }
    });
  });
}
