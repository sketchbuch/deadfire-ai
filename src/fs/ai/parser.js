// @flow

import { BOOL, ENCODING, GUID, INT8, INT32 } from '../../constants/io';
import { UUID } from '../utils/fs';
const Parser = require('binary-parser').Parser;

/**
 * Parses the full contents of an AI file
 */
export function parse(fileContents: string, quick: boolean = false) {
  const aiHeader = new Parser().uint32le('HeaderVersion').uint32le('TypesLen');

  let aiData = aiHeader.parse(fileContents);
  let curPos = INT32 + INT32;
  aiData.Types = [];

  // Get types
  for (let i = 0; i < aiData.TypesLen; i++) {
    const typeParser = new Parser()
      .skip(curPos)
      .buffer('TypeID', { length: 16 })
      .uint32le('Version');

    const result = typeParser.parse(fileContents);
    result.TypeID = bytesToUuid(result.TypeID);

    aiData.Types.push(result);
    curPos += GUID + INT32;

    if (i === aiData.TypesLen - 1) {
      const selTypeParser = new Parser().skip(curPos).buffer('TypeID', { length: 16 });

      aiData.TypeID = bytesToUuid(selTypeParser.parse(fileContents).TypeID);
      curPos += GUID;
    }
  }

  // Name
  const nameParser = new Parser()
    .skip(curPos)
    .uint8('NameLen')
    .string('Name', { length: 'NameLen' })
    .uint32le('OldSupportedClassesLen');

  aiData = { ...aiData, ...nameParser.parse(fileContents), OldSupportedClasses: [] };
  curPos += INT8 + aiData.NameLen + INT32;

  if (aiData.OldSupportedClassesLen > 0) {
    // To do...
  }

  // Supported classes
  const supParser = new Parser().skip(curPos).uint32le('SupportedClassesLen');

  aiData = { ...aiData, ...supParser.parse(fileContents), SupportedClasses: [] };
  curPos += INT32;

  if (aiData.SupportedClassesLen > 0) {
    // Get supported classes
    for (let i = 0; i < aiData.SupportedClassesLen; i++) {
      const supItemParser = new Parser().skip(curPos).buffer('CharacterClassGameData', { length: 16 });

      const result = supItemParser.parse(fileContents);
      result.CharacterClassGameData = bytesToUuid(result.CharacterClassGameData);
      aiData.SupportedClasses.push(result);
      curPos += GUID;
    }
  }

  // Actonsets classes
  const asParser = new Parser().skip(curPos).uint32le('ConditionalActionSetsLen');
  aiData = { ...aiData, ...asParser.parse(fileContents), ConditionalActionSets: [] };
  curPos += INT32;

  if (quick) {
    return aiData;
  }

  if (aiData.ConditionalActionSetsLen > 0) {
    // Get types
    for (let i = 0; i < aiData.ConditionalActionSetsLen; i++) {
      const casParser = new Parser()
        .skip(curPos)
        .uint32le('Version')
        .buffer('TypeID', { length: 16 })
        .uint8('NameLen')
        .string('Name', { length: 'NameLen' })
        .uint32le('ConditionsLen');

      const result = casParser.parse(fileContents);
      result.TypeID = bytesToUuid(result.TypeID);
      let actionSet = { ...result, Conditions: [] };

      curPos += INT32 + GUID + INT8 + actionSet.NameLen + INT32;

      if (actionSet.ConditionsLen > 0) {
        for (let i = 0; i < actionSet.ConditionsLen; i++) {
          const conParser = new Parser()
            .skip(curPos)
            .uint32le('Version')
            .buffer('TypeID', { length: 16 })
            .buffer('ConditionalSet', { length: 16 })
            .uint8('Not');

          const result = conParser.parse(fileContents);
          result.TypeID = bytesToUuid(result.TypeID);
          result.ConditionalSet = bytesToUuid(result.ConditionalSet);
          actionSet.Conditions.push(result);

          curPos += INT32 + GUID + GUID + BOOL;
        }
      }

      const actParser = new Parser().skip(curPos).uint32le('ActionLen');

      actionSet = { ...actionSet, ...actParser.parse(fileContents), Actions: [] };
      curPos += INT32;

      if (actionSet.ActionLen > 0) {
        for (let i = 0; i < actionSet.ActionLen; i++) {
          const aActParser = new Parser()
            .skip(curPos)
            .uint32le('Version')
            .buffer('TypeID', { length: 16 })
            .uint32le('ActionType')
            .buffer('AbilityPackage', { length: 16 })
            .buffer('Ability', { length: 16 })
            .buffer('Consumable', { length: 16 })
            .buffer('TargetingFilter', { length: 16 })
            .buffer('TargetingPreference', { length: 16 })
            .uint32le('AllowedMovement')
            .uint32le('Cooldown');

          const result = aActParser.parse(fileContents);
          result.TypeID = bytesToUuid(result.TypeID);
          result.AbilityPackage = bytesToUuid(result.AbilityPackage);
          result.Ability = bytesToUuid(result.Ability);
          result.Consumable = bytesToUuid(result.Consumable);
          result.TargetingFilter = bytesToUuid(result.TargetingFilter);
          result.TargetingPreference = bytesToUuid(result.TargetingPreference);

          actionSet.Actions.push(result);
          curPos += INT32 + GUID + INT32 + GUID + GUID + GUID + GUID + GUID + INT32 + INT32;
        }
      }

      const postActionsParser = new Parser()
        .skip(curPos)
        .uint32le('AllowedMovement')
        .uint32le('Cooldown');

      actionSet = { ...actionSet, ...postActionsParser.parse(fileContents) };
      aiData.ConditionalActionSets.push(actionSet);
      curPos += INT32 + INT32;
    }
  }

  // End parser
  const endParser = new Parser()
    .skip(curPos)
    .string('UniqueID', { length: 16, encoding: ENCODING })
    .uint8('CanEdit')
    .uint8('DescriptionLen')
    .string('Description', { length: 'DescriptionLen' });

  const result = endParser.parse(fileContents);
  result.UniqueID = bytesToUuid(result.UniqueID);

  aiData = { ...aiData, ...result };
  return aiData;
}

function reverseChunker(element) {
  const chunks = [];

  for (let i = 0; i < element.length; i += 2) {
    chunks.push(element.substring(i, i + 2));
  }

  return chunks.reverse().join('');
}

function bytesToUuid(bytesToConvert) {
  const uuid = UUID.fromBytes(bytesToConvert).hex;
  const newUuid = [];

  uuid.split('-').forEach((element, index) => {
    if (index < 3) {
      newUuid.push(reverseChunker(element));
    } else {
      newUuid.push(element);
    }
  });

  return newUuid.join('-');
}
