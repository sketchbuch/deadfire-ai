// @flow

import * as io from '../../constants/io';
import { APP_PATH, FOLDER } from './fs';

/**
 * Returns the full filepath for a language file stored in the app installation folder.
 */
export default function getLanguagePath(lang: Languages): string {
  return `${APP_PATH}/${FOLDER}/data/translations_${lang}.${io.FILE_TYPE}`;
}
