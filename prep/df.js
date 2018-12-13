const Parser = require("binary-parser").Parser;
const fs = require('fs');
const UUID = require('uuid-js');
const FILE_PATH = './stephen.fighter1.customai';
const ENCODING = 'hex';
const GUID = 16;
const INT32 = 4;
const INT8 = 1;
const BOOL = INT8;
let as = '';

/**
* Reads and parses a PoE2 user AI binary file.
*/
function readEternityAiFile(fileName) {
  if (fileName === undefined) fileName = FILE_PATH;

  fs.readFile(fileName, function (err, data) {
    const aiHeader = new Parser()
      .uint32le('HeaderVersion')
      .uint32le('TypesLen');
    
    let aiData = aiHeader.parse(data);
    let curPos = INT32 + INT32;
    aiData.Types = [];

    // Get types
    for (let i = 0; i < aiData.TypesLen; i ++) {
      const typeParser = new Parser()
        .skip(curPos)
        .buffer('TypeID', { length: 16 })
        .uint32le('Version');

      const result = typeParser.parse(data);
      result.TypeID = bytesToUuid(result.TypeID);
      
      aiData.Types.push(result);
      curPos += GUID + INT32;

      if (i === aiData.TypesLen - 1) {
        const selTypeParser = new Parser()
          .skip(curPos)
          .buffer('TypeID', { length: 16 });

        aiData.TypeID = bytesToUuid(selTypeParser.parse(data).TypeID);
        curPos += GUID;
      } 
    }

    // Name
    const nameParser = new Parser()
      .skip(curPos)
      .uint8('NameLen')
      .string('Name', { length: 'NameLen' })
      .uint32le('OldSupportedClassesLen');

    aiData = {...aiData, ...nameParser.parse(data), OldSupportedClasses: []}
    curPos += INT8 + aiData.NameLen + INT32;

    if (aiData.OldSupportedClassesLen > 0) { // To do...
    }

      // Supported classes
    const supParser = new Parser()
      .skip(curPos)
      .uint32le('SupportedClassesLen');

    aiData = {...aiData, ...supParser.parse(data), SupportedClasses: []}
    curPos += INT32;

    if (aiData.SupportedClassesLen > 0) { // Get supported classes
      for (let i = 0; i < aiData.SupportedClassesLen; i ++) {
        const supItemParser = new Parser()
          .skip(curPos)
          .buffer('CharacterClassGameData', { length: 16 });
  
        const result = supItemParser.parse(data);
        result.CharacterClassGameData = bytesToUuid(result.CharacterClassGameData);
        aiData.SupportedClasses.push(result);
        curPos += GUID;
      }
    }

      // Actonsets classes
    const asParser = new Parser()
      .skip(curPos)
      .uint32le('ConditionalActionSetsLen');
    aiData = {...aiData, ...asParser.parse(data), ConditionalActionSet: []}
    curPos += INT32;

    if (aiData.ConditionalActionSetsLen > 0) { // Get types
      for (let i = 0; i < aiData.ConditionalActionSetsLen; i ++) {
        const casParser = new Parser()
          .skip(curPos)
          .uint32le('Version')
          .buffer('TypeID', { length: 16 }) 
          .uint8('NameLen')
          .string('Name', { length: 'NameLen' })
          .uint32le('ConditionsLen');
  
        const result = casParser.parse(data);
        result.TypeID = bytesToUuid(result.TypeID);
        let actionSet = {...result, Conditions: []};

        curPos += INT32 + GUID + INT8 + actionSet.NameLen + INT32;
        
        if (actionSet.ConditionsLen > 0) {
          for (let i = 0; i < actionSet.ConditionsLen; i ++) {
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

            curPos += INT32 + GUID + GUID + BOOL;
          }
        }

        const actParser = new Parser()
          .skip(curPos)
          .uint32le('ActionLen')

        actionSet = {...actionSet, ...actParser.parse(data), Actions: []};
        curPos += INT32;

        if (actionSet.ActionLen > 0) {
          for (let i = 0; i < actionSet.ActionLen; i ++) {
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
            result.TargetingPreference = bytesToUuid(result.TargetingPreference);

            actionSet.Actions.push(result);
            curPos += INT32 + GUID + INT32 + GUID + GUID + GUID + GUID + GUID + INT32 + INT32;
          }
        }

        const postActionsParser = new Parser()
          .skip(curPos)
          .uint32le('AllowedMovement')
          .uint32le('Cooldown')

        actionSet = {...actionSet, ...postActionsParser.parse(data)};
        aiData.ConditionalActionSet.push(actionSet);
        curPos += INT32 + INT32;

        as = actionSet;
      }
    }

    // End parser
    const endParser = new Parser()
      .skip(curPos)
      .string('UniqueID', { length: 16, encoding: ENCODING })
      .uint8('CanEdit')
      .uint8('DescriptionLen')
      .string('Description', { length: 'DescriptionLen' });

      const result = endParser.parse(data);
      result.UniqueID = bytesToUuid(result.UniqueID);

      aiData = {...aiData, ...result};
      curPos += GUID + INT8 + INT8 + result.DescriptionLen;

    console.log(fileName);
    console.log('---')
    console.log(aiData);
    console.log('---')
  });
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

readEternityAiFile()