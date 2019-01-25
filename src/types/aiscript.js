// @flow

import domainBaseDefault from './domain';
import type { ByteStructure } from './byteStructure';
import byteStructureDefault from './byteStructure';
import { generateId } from '../utils/ids';
import { ICON_SCRIPTS, ICON_WARNING } from '../constants/icons';
import { ROUTE_SCRIPTS_EDIT, ROUTE_SCRIPTS_PARSE_ERROR } from '../constants/routes';
import { PARSE_STATE_ERROR, PARSE_STATE_FULL, PARSE_STATE_QUICK, PARSE_STATE_UNPARSED } from '../constants/misc';

const parseStates = [PARSE_STATE_UNPARSED, PARSE_STATE_QUICK, PARSE_STATE_FULL, PARSE_STATE_ERROR];
export type ParseStates = $Values<typeof parseStates>;

export type AiscriptObj = {
  byteStructure: ByteStructure,
  fileName: string,
  parseError: boolean,
};

export type Aiscript = {
  ...$Exact<DomainBase>,
  byteStructure: ByteStructure,
  fileName: string,
  filePath: string,
  label: string,
  parseErrorMsg: string,
  parseState: ParseStates,
};

const aiscriptDefault: Aiscript = {
  ...domainBaseDefault,
  byteStructure: { ...byteStructureDefault },
  fileName: '',
  filePath: '',
  label: '',
  parseErrorMsg: '',
  parseState: PARSE_STATE_UNPARSED,
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
      id: generateId(getIdStr(aiscriptObj)),
    };
  }

  return hydrate(aiscriptObj);
}

/**
 * Returns an updated aiscriptObj with methods.
 */
export function hydrate(aiscriptObj: Aiscript): Aiscript {
  // In case we cache the data as JSON in the future, spread in defaults
  // to add any new props we may have added in an update to the Aiscript definition.
  let hydratedObj = { ...aiscriptDefault, ...aiscriptObj };

  // Hydrate if needed:
  if (!hydratedObj.hydrated) {
    hydratedObj = {
      ...hydratedObj,
      hydrated: true,
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
        return this.parseState === PARSE_STATE_ERROR ? ICON_WARNING : ICON_SCRIPTS;
      },
      getLabel: function() {
        return this.label;
      },
      getTooltip: function() {
        return this.getLabel();
      },
      getUrl: function(linkType: string) {
        let script = ROUTE_SCRIPTS_EDIT;

        if (this.parseState === PARSE_STATE_ERROR) {
          script = ROUTE_SCRIPTS_PARSE_ERROR;
        }

        return script.replace(':scriptId', this.id);
      },
    };
  }

  return hydratedObj;
}

/**
 * Returns a string to be used when creating an ID for an aiscriptObj.
 */
export function getIdStr(aiscriptObj: Aiscript): string {
  return 'aiscript:' + aiscriptObj.label;
}

export default aiscriptDefault;
