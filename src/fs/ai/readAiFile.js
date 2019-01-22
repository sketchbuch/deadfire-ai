// @flow

import byteStructureDefault from '../../types/byteStructure';
import type { FsObject } from '../../types/fsObject';
import { fs } from '../utils/fs';
import { parseQuick } from './parser';

/**
 * Reads an AI Script file and returns the contents
 */
async function readAiFile(aiFile: string): Promise<FsObject> {
  const result = await new Promise((resolve, reject) => {
    fs.readFile(aiFile, (err: ?Error, data: Buffer = '') => {
      if (err) {
        reject({
          data: {},
          errorObj: err,
          success: false,
        });
      } else {
        resolve({
          data: { bytes: data },
          errorObj: err,
          success: true,
        });
      }
    });
  });

  if (result.success) {
    try {
      const byteStructure = parseQuick(result.data.bytes);
      result.data = {
        byteStructure: { ...byteStructureDefault, ...byteStructure },
        fileName: aiFile,
        parseError: false,
      };
    } catch (error) {
      result.errorObj = error;
      result.success = false;

      result.data = {
        byteStructure: { ...byteStructureDefault },
        fileName: aiFile,
        parseError: true,
      };
    }
  }

  return result;
}

export default readAiFile;
