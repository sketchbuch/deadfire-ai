// @flow

import aiscriptDefault, { factory, hydrate, getIdStr } from '../aiscript';
import { ICON_BUSY, ICON_SCRIPTS, ICON_WARNING } from '../../constants/icons';
import { PARSE_STATE_ERROR } from '../../constants/misc';
import { ROUTE_SCRIPTS_EDIT, ROUTE_SCRIPTS_PARSE_ERROR } from '../../constants/routes';
import { generateId } from '../../utils/ids';

describe('Types: Aiscript', () => {
  const LABEL = 'Fighter Script';
  const aiscriptObj = {
    ...aiscriptDefault,
    created: -1,
    label: LABEL,
    updated: -2,
  };
  const ts = Date.now();
  const idStr = getIdStr(aiscriptObj);
  const id = generateId(idStr);
  const testAiscript = {
    ...aiscriptDefault,
    created: ts,
    hydrated: true,
    id: id,
    label: LABEL,
    updated: ts,
  };

  test('getIdStr() returns the same string given the same object', () => {
    const idStrCompare = getIdStr(aiscriptObj);
    expect(idStr).toEqual(idStrCompare);
  });

  test('hydrate() does not hydrate more than once', () => {
    const hydratedObj = hydrate({ ...aiscriptObj, hydrated: true });
    expect(hydratedObj.getLabel()).toBe(undefined);
  });

  describe('factory():', () => {
    test('Returns a new aiscript object', () => {
      const newAiscriptObj = factory(aiscriptObj, ts);
      expect(JSON.stringify(newAiscriptObj)).toEqual(JSON.stringify(testAiscript));
      expect(newAiscriptObj.created).toBe(newAiscriptObj.updated);
    });

    test('Only generates ID once', () => {
      const idAiscriptObj = { ...aiscriptObj };
      idAiscriptObj.id = '12345';
      const newIdAiscriptObj = factory(idAiscriptObj, ts);
      expect(newIdAiscriptObj.created).toBe(-1);
      expect(newIdAiscriptObj.id).toBe('12345');
    });
  });

  describe('Getters:', () => {
    const newAiscriptObj = factory(aiscriptObj, ts);

    test('getLabel() correctly returns the label', () => {
      expect(newAiscriptObj.getLabel()).toEqual(newAiscriptObj.label);
    });

    test('getTooltip() correctly returns the tooltip', () => {
      expect(newAiscriptObj.getTooltip()).toEqual(newAiscriptObj.getLabel() + ' - ' + newAiscriptObj.getDescription());
    });

    describe('getDescription():', () => {
      test('Returns 0 as the actionset count as the description', () => {
        expect(newAiscriptObj.getDescription()).toEqual('(0)');
      });

      test('Returns the actual actionset count as the description', () => {
        const bsAiscriptObj = factory(aiscriptObj, ts);
        bsAiscriptObj.byteStructure.ConditionalActionSetsLen = 2;
        expect(bsAiscriptObj.getDescription()).toEqual('(2)');
      });
    });

    describe('getIcon():', () => {
      test('Returns the scripts icon', () => {
        expect(newAiscriptObj.getIcon()).toEqual(ICON_SCRIPTS);
      });

      test('Returns the busy icon if parsing', () => {
        const pAiscriptObj = factory(aiscriptObj, ts);
        pAiscriptObj.parsing = true;
        expect(pAiscriptObj.getIcon()).toEqual(ICON_BUSY);
      });

      test('Returns the error icon if parsing', () => {
        const pAiscriptObj = factory(aiscriptObj, ts);
        pAiscriptObj.parseState = PARSE_STATE_ERROR;
        expect(pAiscriptObj.getIcon()).toEqual(ICON_WARNING);
      });
    });

    describe('contains()', () => {
      test('Returns false if the aiscript object does not begin with the search term.', () => {
        const term = 'Script';
        const result = newAiscriptObj.contains(term);
        expect(result).toBe(false);
      });

      test('Returns true if the aiscript object begins with the search term.', () => {
        const term = 'Fighter';
        const result = newAiscriptObj.contains(term);
        expect(result).toBe(true);
      });

      test('Returns false if the aiscript object does contain the search term.', () => {
        const term = 'Priest';
        const result = newAiscriptObj.contains(term, true);
        expect(result).toBe(false);
      });

      test('Returns true if the aiscript object contains the search term.', () => {
        const term = 'Script';
        const result = newAiscriptObj.contains(term, true);
        expect(result).toBe(true);
      });
    });

    describe('getUrl()', () => {
      test('Returns ROUTE_SCRIPTS_PARSE_ERROR if the aiscript has a parse error', () => {
        const pAiscriptObj = factory(aiscriptObj, ts);
        pAiscriptObj.parseState = PARSE_STATE_ERROR;
        expect(pAiscriptObj.getUrl()).toBe(ROUTE_SCRIPTS_PARSE_ERROR.replace(':scriptId', pAiscriptObj.id));
      });

      test('Returns ROUTE_SCRIPTS_EDIT for any other linkType', () => {
        const expects = ROUTE_SCRIPTS_EDIT.replace(':scriptId', newAiscriptObj.id);
        expect(newAiscriptObj.getUrl()).toBe(expects);
      });
    });
  });
});
