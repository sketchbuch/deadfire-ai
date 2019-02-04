// @flow

import xmljs from 'xml-js';
import type { FsObject } from '../../types/fsObject';
import { fs } from '../utils/fs';

/**
 * Loads a PoE2 game translation XML file async. callback receives an FsObject.
 */
export default function readEternityTransFile(filePath: string): Promise<FsObject> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'UTF-8', (err: ?Error, data: string | Buffer = '') => {
      if (err) {
        reject({
          data: {},
          errorObj: err,
          success: false,
        });
      } else {
        try {
          const dataJson = JSON.parse(xmljs.xml2json(data, { compact: true }));
          resolve({
            data: dataJson.StringTableFile.Entries.Entry,
            errorObj: err,
            success: true,
          });
        } catch (xmlErr) {
          reject({
            data: {},
            errorObj: xmlErr,
            success: false,
          });
        }
      }
    });
  });
}
