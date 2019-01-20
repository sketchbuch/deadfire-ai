// @flow

import { filterFiles } from './filterFiles';
import { fs } from './fs';

/**
 * Returns a list of files from a directory
 */
async function getDirFiles(dir: string, fileType?: string = ''): Promise<FsObject> {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, 'UTF-8', (err: ?Error, files: string[]) => {
      if (err) {
        reject({
          data: {},
          errorObj: err,
          success: false,
        });
      } else {
        resolve({
          data: { files: fileType === '' ? files : filterFiles(files, fileType) },
          errorObj: err,
          success: true,
        });
      }
    });
  });
}

export default getDirFiles;
