// @flow

import { path } from '../utils/fs';

/**
 * Returns files, filtered to only include files matching fileType.
 */
export function filterFiles(files: string[], fileType: string): string[] {
  let newFiles = [];

  if (files.length > 0) {
    newFiles = files.filter(file => path.extname(file) === fileType);
  }

  return newFiles;
}
