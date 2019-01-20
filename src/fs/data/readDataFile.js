// @flow

import type { FsObject } from '../../types/fsObject';
import { DATA_PATH, fs } from '../utils/fs';
import getDataPath from '../utils/getDataPath';
import writeDataFile from './writeDataFile';

/**
 * Loads a file async. from the filesystem. callback receives an FsObject.
 * IF the file doesn't exist this function will try and create it.
 */
export default function readDataFile(fileName: string): Promise<FsObject> {
  return new Promise((resolve, reject) => {
    const FILE_PATH = getDataPath(fileName);

    fs.readFile(FILE_PATH, 'UTF-8', (err: ?Error, data: string | Buffer = '') => {
      if (err) {
        if (err.code === 'ENOENT') {
          let folders = FILE_PATH.replace(DATA_PATH, '')
            .split('/')
            .filter(f => f !== '');
          if (folders[folders.length - 1].indexOf('.') > -1) {
            folders.pop();
          }
          let finalPath = DATA_PATH + '/' + (folders.length > 1 ? folders.join('/') : folders[0]);

          try {
            fs.mkdirSync(finalPath);
            writeDataFile(fileName, {}).then(response => {
              if (response.err) {
                reject({
                  ...response,
                  data: {},
                  wasCreated: false,
                });
              } else {
                resolve({
                  ...response,
                  data: {},
                  wasCreated: true,
                });
              }
            });
          } catch (createErr) {
            reject({
              data: {},
              errorObj: createErr,
              success: false,
              wasCreated: false,
            });
          }
        } else {
          reject({
            data: {},
            errorObj: err,
            success: false,
            wasCreated: false,
          });
        }
      } else {
        resolve({
          data: data ? JSON.parse(data.trim()) : {},
          errorObj: err,
          success: true,
          wasCreated: false,
        });
      }
    });
  });
}
