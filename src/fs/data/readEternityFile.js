// @flow

import type { FsObject } from '../../types/fsObject';
import { fs } from '../utils/fs';

/**
 * Loads a PoE2 game data file async. callback receives an FsObject.
 */
export default function readEternityFile(filePath: string): Promise<FsObject> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'UTF-8', (err: ?Error, data: string | Buffer = '') => {
      if (err) {
        reject({
          data: {},
          errorObj: err,
          success: false,
        });
      } else {
        resolve({
          data: data ? JSON.parse(data.trim()) : {},
          errorObj: err,
          success: true,
        });
      }
    });
  });
}
