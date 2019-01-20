// @flow

import type { FsObject } from '../../types/fsObject';
import { fs } from '../utils/fs';

/**
 * Reads an AI Script file and returns the contents
 */
async function readAiFile(aiFilePath: string): Promise<FsObject> {
  return await new Promise((resolve, reject) => {
    fs.readFile(aiFilePath, (err: ?Error, data: Buffer = '') => {
      if (err) {
        reject({
          data: {},
          errorObj: err,
          success: false,
          wasCreated: false,
        });
      } else {
        resolve({
          data: { bytes: data },
          errorObj: err,
          success: true,
          wasCreated: false,
        });
      }
    });
  });
}

export default readAiFile;
