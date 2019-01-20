// @flow

import type { FsObject } from '../../types/fsObject';
import { fs } from '../utils/fs';
import getLanguagePath from '../utils/getLanguagePath';

/**
 * Loads a language file
 */
export default function readLangFile(lang: Languages): Promise<FsObject> {
  return new Promise((resolve, reject) => {
    const FILE_PATH = getLanguagePath(lang);

    fs.readFile(FILE_PATH, 'UTF-8', (err: ?Error, data: string | Buffer = '') => {
      if (err) {
        reject({
          data: {},
          errorObj: err,
          success: false,
          wasCreated: false,
        });
      } else {
        let langData = {};

        if (data) {
          langData = JSON.parse(data.trim());
        }

        resolve({
          data: langData,
          errorObj: err,
          success: true,
          wasCreated: false,
        });
      }
    });
  });
}
