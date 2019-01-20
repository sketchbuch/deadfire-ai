// @flow

import byteStructureDefault from '../../types/byteStructure';
import getDirFiles from '../utils/getDirFiles';
import readAiFile from './readAiFile';
import type { AiscriptObj } from '../../types/aiscript';
import type { FsObject } from '../../types/fsObject';
import { AI_FILE } from '../../constants/io';
import { parseQuick } from './parser';

/**
 * Returns an array of AI files.
 */
export default async function getAiFiles(aiPath: string): Promise<FsObject> {
  const results = await getDirFiles(aiPath, AI_FILE);
  if (results.success) {
    const newFiles: AiscriptObj[] = [];

    for (const file of results.data.files) {
      const result: FsObject = await readAiFile(aiPath + file);
      if (result.success) {
        let parsedData = {};
        let parseError = '';

        try {
          parsedData = parseQuick(result.data.bytes);
        } catch (error) {
          parseError = error.message();
        }

        newFiles.push({
          byteStructure: { ...byteStructureDefault, ...parsedData },
          fileName: file,
          parseError,
        });
      }
    }

    results.data.files = [...newFiles];
  }
  return results;
}
