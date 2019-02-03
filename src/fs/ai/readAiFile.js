// @flow

import byteStructureDefault from '../../types/byteStructure';
import type { FsObject } from '../../types/fsObject';
import { fs } from '../utils/fs';
import { parse } from './parser';
import { PARSE_STATE_QUICK, PARSE_STATE_FULL } from '../../constants/misc';

/**
 * Reads an AI Script file and returns the contents
 */
async function readAiFile(aiFile: string, parseType: PARSE_STATE_QUICK | PARSE_STATE_FULL): Promise<FsObject> {
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
      let parsedByteStructure = {};

      if (parseType === PARSE_STATE_FULL) {
        parsedByteStructure = parse(result.data.bytes);
      } else {
        parsedByteStructure = parse(result.data.bytes, true);
      }

      result.data = {
        byteStructure: { ...byteStructureDefault, ...parsedByteStructure },
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
