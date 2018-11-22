// @flow

import * as io from '../constants/io';
import type { FsObject } from '../types/fsObject';
import type { LanguagesType } from '../types/lang';

let electron = null;
let fs = require('fs');

  // If in electron environment:
if (window !== undefined && window.require) {
  electron = window.require('electron');
  fs = electron.remote.require('fs');
}

const APP_PATH = (electron !== null) ? electron.remote.app.getAppPath() : '';
const DATA_PATH = (electron !== null) ? electron.remote.app.getPath('userData') : '';
const FOLDER = (window.location.hostname === 'localhost') ? 'public' : 'build';


/**
* Loads a file async. from the filesystem. callback receives a results object: {
*   success: boolean ,
*   errorObj: error,
*   data: object,
* }
* 
* IF the file doesn't exist this function will try and create it.
*
* @param string fileName The name of the file that should be loaded (without file type).
*/
export function readDataFile(fileName: string): Promise<FsObject> {
  return new Promise((resolve, reject) => {
    const FILE_PATH = getDataPath(fileName)

    fs.readFile(FILE_PATH, 'UTF-8', (err: ?Error, data: string | Buffer = '') => {
      if (err) {
        if (err.code === 'ENOENT') {
          createDataFolder(FILE_PATH);
          writeFile(fileName, {})
            .then(
              response => {
                if (response.err) {
                  reject({
                    ...response,
                    data: {},
                  });

                } else {
                  resolve({
                    ...response,
                    data: {},
                  });
                }
              }
            );
        } else {
          reject({
            success: false,
            errorObj: err,
            data: {},
          });
        }
      } else {
        resolve({
          success: true,
          errorObj: err,
          data: (data) ? JSON.parse(data.trim()) : {},
        });
      }
    });
  });
}

/**
* Loads a language file
*
* @param string fileName The name of the file that should be loaded (without file type).
*/
export function readLangFile(lang: LanguagesType): Promise<FsObject> {
  return new Promise((resolve, reject) => {
    const FILE_PATH = getLanguagePath(lang)

    fs.readFile(FILE_PATH, 'UTF-8', (err: ?Error, data: string | Buffer = '') => {
      if (err) {
        reject({
          success: false,
          errorObj: err,
          data: {},
        });
      } else {
        let langData = {};

        if (data) {
          langData = JSON.parse(data.trim());
          window.app.translations[lang] = langData[lang];
        }
        
        resolve({
          success: true,
          errorObj: err,
          data: langData,
        });
      }
    });
  });
}

/**
* Loads a PoE zip file
*/
export function readEternityFile(): Promise<FsObject> {
  return new Promise((resolve, reject) => {
    const FILE_PATH = '/home/stephen/.steam/steam/steamapps/common/Pillars of Eternity II/PillarsOfEternityII_Data/exported/design/ai/aibehaviors/aibehaviors.aibehaviorbundle';

    fs.readFile(FILE_PATH, 'UTF-8', (err: ?Error, data: string | Buffer = '') => {
      if (err) {
        reject({
          success: false,
          errorObj: err,
          data: {},
        });
      } else {
        resolve({
          success: true,
          errorObj: err,
          data: (data) ? JSON.parse(data.trim()) : {},
        });
      }
    });
  });
}

/**
* Writes a file to the disc as json using the content provided.
*
* @param string fileName The name of the file that should be loaded (without file type).
* @param mixed jsonContent The content to write.
*/
export function writeFile(fileName: string, jsonContent: Object | string): Promise<FsObject> {
  return new Promise((resolve, reject) => {
      const FILE_PATH = getDataPath(fileName);
      const content = { [fileName.toLowerCase()]: jsonContent };

      fs.writeFile(FILE_PATH, JSON.stringify(content), 'UTF-8', (err: ?Error) => {
        if (err) {
          reject({
            success: false,
            errorObj: err,
          });
        } else {
          resolve({
            success: true,
            errorObj: err,
          });
        }
      });
  });
}

/**
* Returns the full filepath for a language file stored in the app installation folder.
*
* @param string lang The key of the language to load.
*/
function getLanguagePath(lang: LanguagesType): string {
  return `${APP_PATH}/${FOLDER}/data/translations_${lang}.${io.FILE_TYPE}`;
}

/**
* Returns the full filepath for a data file stored in the app config folder (OS dependent).
*
* @param string filePath The path for the file including filename.
*/
function getDataPath(filePath: string): string {
  return `${DATA_PATH}${io.DATA_FOLDER}${filePath.trim()}.${io.FILE_TYPE}`;
}

/**
* Creates the data storage folder and all intermediate folders.
*
* @param string filePath The full path to a file.
*/
export function createDataFolder(filePath: string) {
  if (!fs.existsSync(filePath)) {
    let folders = filePath.replace(DATA_PATH, '').split('/').filter(f => f !== '');
    if (folders[folders.length - 1].indexOf('.') > -1) folders.pop();
    let finalPath = DATA_PATH + '/' + ((folders.length > 1) ? folders.join('/') : folders[0]);

    try {
      fs.mkdirSync(finalPath);
    } catch (err) {
    }
  }
}