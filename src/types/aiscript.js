// @flow

import domainBaseDefault from './domain';
import type { ByteStructure } from './byteStructure';
import byteStructureDefault from './byteStructure';
import { generateId } from '../utils/ids';

export type AiscriptObj = {
  byteStructure: ByteStructure,
  fileName: string,
  parseError: string,
};

export type Aiscript = {
  ...$Exact<DomainBase>,
  byteStructure: ByteStructure,
  fileName: string,
  fullyParsed: boolean,
  label: string,
};

const aiscriptDefault: Aiscript = {
  ...domainBaseDefault,
  byteStructure: { ...byteStructureDefault },
  fileName: '',
  fullyParsed: false,
  label: '',
};

export const aiScriptSort = ['label', 'updated'];

/**
 * Returns a hydrated Aiscript object.
 */
export function factory(aiscriptObj: Aiscript, ts: number): Aiscript {
  if (aiscriptObj.id === '') {
    aiscriptObj = {
      ...aiscriptObj,
      created: ts,
      updated: ts,
      id: generateId(getIdStr(aiscriptObj), ts),
    };
  }

  return hydrate(aiscriptObj);
}

/**
 * Returns an updated aiscriptObj with methods.
 */
export function hydrate(aiscriptObj: Aiscript): Aiscript {
  return {
    ...aiscriptDefault,
    ...aiscriptObj,
    contains: function(term?: string, anywhere?: boolean = false) {
      if (term) {
        term = term.toLowerCase();
        const searchStr = this.label.toLowerCase();

        if (anywhere) {
          if (searchStr.indexOf(term) !== -1) {
            return true;
          }
        } else {
          if (searchStr.indexOf(term) === 0) {
            return true;
          }
        }
      }

      return false;
    },
    getDescription: function() {
      return '';
    },
    getIcon: function() {
      return '';
    },
    getLabel: function() {
      return this.label;
    },
    getTooltip: function() {
      return this.getLabel();
    },
    getUrl: function(linkType: string) {
      return '';
    },
  };
}

/**
 * Returns a string to be used when creating an ID for an aiscriptObj.
 */
export function getIdStr(aiscriptObj: Aiscript): string {
  return 'aiscript:' + aiscriptObj.label;
}

export default aiscriptDefault;
