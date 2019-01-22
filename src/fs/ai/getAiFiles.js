// @flow

import getDirFiles from '../utils/getDirFiles';
import type { FsObject } from '../../types/fsObject';
import { AI_FILE } from '../../constants/io';

/**
 * Returns an array of AI files.
 */
export default async function getAiFiles(aiPath: string): Promise<FsObject> {
  return await getDirFiles(aiPath, AI_FILE);
}
