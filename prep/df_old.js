const Parser = require('binary-parser').Parser;
const fs = require('fs');
const UUID = require('uuid-js');
const FILE_PATH = './fighter2.customai';
const ENCODING = 'hex';
const TYPE_GUID = 16;
const TYPE_VER = 4;
let as = '';

/**
 * Reads and parses a PoE2 user AI binary file.
 */
function readEternityAiFile(fileName) {
  if (fileName === undefined) {
    fileName = FILE_PATH;
  }

  fs.readFile(fileName, function(err, data) {
    console.log(fileName);

    const aiHeader = new Parser()
      .uint32le('HeaderVersion')
      .uint32le('TypesLen');

    let aiData = aiHeader.parse(data);
    let curPos = 8;
    aiData.Types = [];
    const TYPE_COUNT = aiData.TypesLen;

    // Get types
    for (let i = 0; i < TYPE_COUNT; i++) {
      const typeParser = new Parser()
        .skip(curPos)
        .buffer('TypeID', { length: 16 })
        .uint32le('Version');

      const result = typeParser.parse(data);
      result.TypeID = bytesToUuid(result.TypeID);

      aiData.Types.push(result);
      curPos += TYPE_GUID + TYPE_VER;

      if (i === TYPE_COUNT - 1) {
        const selTypeParser = new Parser()
          .skip(curPos)
          .buffer('TypeID', { length: 16 });

        aiData.TypeID = bytesToUuid(selTypeParser.parse(data).TypeID);
        curPos += TYPE_GUID;
      }
    }

    // Name
    const nameParser = new Parser()
      .skip(curPos)
      .uint8('NameLen')
      .string('Name', { length: 'NameLen' })
      .uint32le('OldSupportedClassesLen');

    aiData = { ...aiData, ...nameParser.parse(data), OldSupportedClasses: [] };

    curPos += 4 + aiData.NameLen + 1;

    if (aiData.OldSupportedClassesLen > 0) {
      // To do...
    }

    // Supported classes
    const supParser = new Parser().skip(curPos).uint32le('SupportedClassesLen');

    aiData = { ...aiData, ...supParser.parse(data), SupportedClasses: [] };
    curPos += 4;

    if (aiData.SupportedClassesLen > 0) {
      const SUP_COUNT = aiData.SupportedClassesLen;

      // Get types
      for (let i = 0; i < SUP_COUNT; i++) {
        const supItemParser = new Parser()
          .skip(curPos)
          .buffer('CharacterClassGameData', { length: 16 });

        const result = supItemParser.parse(data);
        result.CharacterClassGameData = bytesToUuid(
          result.CharacterClassGameData
        );

        aiData.SupportedClasses.push(result);
        curPos += TYPE_GUID;
      }
    }

    // Actonsets classes
    const asParser = new Parser()
      .skip(curPos)
      .uint32le('ConditionalActionSetsLen');
    aiData = { ...aiData, ...asParser.parse(data), ConditionalActionSet: [] };
    curPos += 4;

    if (aiData.ConditionalActionSetsLen > 0) {
      const CAS_COUNT = aiData.ConditionalActionSetsLen;

      // Get types
      for (let i = 0; i < CAS_COUNT; i++) {
        const casParser = new Parser()
          .skip(curPos)
          .uint32le('Version')
          .buffer('TypeID', { length: 16 })
          .uint8('NameLen')
          .string('Name', { length: 'NameLen' })
          .uint32le('ConditionsLen');

        const result = casParser.parse(data);
        result.TypeID = bytesToUuid(result.TypeID);

        let actionSet = { ...result, Conditions: [] };

        curPos += TYPE_GUID + TYPE_VER + (1 + actionSet.NameLen) + 4;

        if (actionSet.ConditionsLen > 0) {
          const CON_COUNT = actionSet.ConditionsLen;

          for (let i = 0; i < CON_COUNT; i++) {
            const conParser = new Parser()
              .skip(curPos)
              .uint32le('Version')
              .buffer('TypeID', { length: 16 })
              .buffer('ConditionalSet', { length: 16 })
              .uint8('Not');

            const result = conParser.parse(data);
            result.TypeID = bytesToUuid(result.TypeID);
            result.ConditionalSet = bytesToUuid(result.ConditionalSet);

            actionSet.Conditions.push(result);

            curPos += TYPE_GUID + TYPE_VER + TYPE_GUID + 1;
          }
        }

        const actParser = new Parser().skip(curPos).uint32le('ActionLen');

        actionSet = { ...actionSet, ...actParser.parse(data), Actions: [] };
        curPos += 4;

        if (actionSet.ActionLen > 0) {
          const ACT_COUNT = actionSet.ActionLen;

          for (let i = 0; i < ACT_COUNT; i++) {
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

            const result = aActParser.parse(data);
            result.TypeID = bytesToUuid(result.TypeID);
            result.AbilityPackage = bytesToUuid(result.AbilityPackage);
            result.Ability = bytesToUuid(result.Ability);
            result.Consumable = bytesToUuid(result.Consumable);
            result.TargetingFilter = bytesToUuid(result.TargetingFilter);
            result.TargetingPreference = bytesToUuid(
              result.TargetingPreference
            );

            actionSet.Actions.push(result);
            curPos +=
              TYPE_GUID +
              TYPE_VER +
              TYPE_VER +
              TYPE_GUID * 5 +
              TYPE_VER +
              TYPE_VER;
          }
        }

        const postActionsParser = new Parser()
          .skip(curPos)
          .uint32le('AllowedMovement')
          .uint32le('Cooldown');

        actionSet = { ...actionSet, ...postActionsParser.parse(data) };
        aiData.ConditionalActionSet.push(actionSet);
        curPos += TYPE_VER + TYPE_VER;

        as = actionSet;
      }
    }

    // End parser
    const endParser = new Parser()
      .skip(curPos)
      .string('UniqueID', { length: 16, encoding: ENCODING })
      .uint8('CanEdit')
      .uint32le('DescriptionLen')
      .string('Description', { length: 'DescriptionLen' });

    const result = endParser.parse(data);
    result.UniqueID = bytesToUuid(result.UniqueID);

    aiData = { ...aiData, ...result };
    curPos += TYPE_GUID + TYPE_VER + 1 + result.DescriptionLen;

    console.log(aiData);
    console.log('');
  });
}

function bytesToUuid(bytesToConvert) {
  return UUID.fromBytes(bytesToConvert).hex;
}

readEternityAiFile('./fighter3-a.customai');
//readEternityAiFile("./fighter3.customai")
