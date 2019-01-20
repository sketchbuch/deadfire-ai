// @flow

import * as io from '../../constants/io';
import { DATA_PATH } from './fs';

/**
 * Returns the full filepath for a data file stored in the app config folder (OS dependent).
 */
export default function getDataPath(filePath: string): string {
  return `${DATA_PATH}${io.DATA_FOLDER}${filePath.trim()}.${io.FILE_TYPE}`;
}
