// @flow

import { put, select, takeLatest } from 'redux-saga/effects';
import type { FsObject } from '../../types/fsObject';
import type { EternityDataObj } from '../../types/eternity';
import {
  ETERNITY_LOAD,
  ETERNITY_LOAD_ERROR,
  ETERNITY_LOAD_SUCCESS,
  LANGUAGE_LOAD_SUCCESS,
} from '../../constants/actionTypes';
import { eternityFiles } from '../../constants/io';
import readEternityFile from '../../fs/data/readEternityFile';
import readEternityTransFile from '../../fs/data/readEternityTransFile';

export default function* eternityWatcher() {
  yield [takeLatest(LANGUAGE_LOAD_SUCCESS, loadEternityFiles)];
}

function* loadEternityFiles(action: ActionObj): Generator<*, *, *> {
  yield put({ type: ETERNITY_LOAD });
  const installPath: string = yield select(state => state.settings.installPath);
  const LANG: string = yield select(state => state.languages.current);
  const results = {};

  try {
    for (const fileObj in eternityFiles) {
      const file = eternityFiles[fileObj];
      let fileStrings = [];

      if (file.trans) {
        // Load and normalise the String table for this file.
        const transResult: FsObject = yield readEternityTransFile(
          installPath + '/' + file.trans.replace('%LANG%', LANG.toLowerCase())
        );

        fileStrings = transResult.data.map((item, index) => {
          return {
            id: parseInt(item.ID._text, 10),
            plural: item.FemaleText._text,
            singular: item.DefaultText._text,
          };
        });
      }

      const fileData: FsObject = yield readEternityFile(installPath + '/' + file.path);
      let filteredData = fileData.data.GameDataObjects.filter(item => item.DebugName.indexOf('_OLD') < 0);

      if (file.type) {
        filteredData = fileData.data.GameDataObjects.filter(item => item.$type === file.type);
      }

      // Normalise to EternityDataObj
      results[file.key] = filteredData.map(
        (item, index: number): EternityDataObj => {
          const labelIndex = getLabelIndex(item.Components);
          const translatedLabel = fileStrings.find(item => item.id === labelIndex);

          return {
            debugName: item.DebugName,
            labelIndex,
            id: item.ID,
            index: index,
            label: translatedLabel ? translatedLabel.singular : item.DebugName,
            type: item.$type,
          };
        }
      );
    }

    yield put({ type: ETERNITY_LOAD_SUCCESS, payload: results });
  } catch (error) {
    yield put({ type: ETERNITY_LOAD_ERROR, payload: { error } });
  }
}

export function getLabelIndex(components: []): number {
  let dn = -2;

  if (components.length > 0) {
    components.forEach(comp => {
      if (dn === -2) {
        if (comp.DisplayName !== undefined) {
          dn = parseInt(comp.DisplayName, 10);
        } else if (comp.DisplayString !== undefined) {
          dn = parseInt(comp.DisplayString, 10);
        }
      }
    });
  }

  return dn;
}
