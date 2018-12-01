const Parser = require("binary-parser").Parser;
const fs = require('fs');
const uuidParse = require('uuid-parse');
const FILE_PATH = "./fighter2.customai";
const ENCODING = 'hex';
const TYPE_GUID = 16;
const TYPE_VER = 4;

/**
* Reads and parses a PoE2 user AI binary file.
*/
function readEternityAiFile(fileName) {
  if (fileName === undefined) fileName = FILE_PATH;

  fs.readFile(fileName, function (err, data) {
    console.log(fileName);
    const aiHeader = new Parser()
      .int32le('HeaderVersion')
      .int32le('TypesLen');
    
    let aiData = aiHeader.parse(data);
    let curPos = 8;
    aiData.Types = []
    const TYPE_COUNT = aiData.TypesLen;

    // Get types
    for (var i = 0; i < TYPE_COUNT; i ++) {
      const typeParser = new Parser()
        .skip(curPos)
        .string('TypeID', { length: 16, encoding: ENCODING })
        .int32le('Version');

      aiData.Types.push(typeParser.parse(data));
      curPos += (TYPE_GUID + TYPE_VER);

      if (i === TYPE_COUNT - 1) {
        const selTypeParser = new Parser()
          .skip(curPos)
          .string('TypeID', { length: 16, encoding: ENCODING });

        aiData.TypeID = selTypeParser.parse(data).TypeID;
        curPos += TYPE_GUID;
      } 
    }

    // Name
    const nameParser = new Parser()
      .skip(curPos)
      .int8('NameLen')
      .string('Name', { length: 'NameLen' })
      .int32le('OldSupportedClassesLen');

    aiData = {...aiData, ...nameParser.parse(data), OldSupportedClasses: []}
    curPos += (4 + aiData.NameLen + 1);

    if (aiData.OldSupportedClassesLen > 0) { // To do...
    }

      // Supported classes
    const supParser = new Parser()
      .skip(curPos)
      .int32le('SupportedClassesLen');

    aiData = {...aiData, ...supParser.parse(data), SupportedClasses: []}
    curPos += 4;

    if (aiData.SupportedClassesLen > 0) {
      const SUP_COUNT = aiData.SupportedClassesLen;
  
      // Get types
      for (var i = 0; i < SUP_COUNT; i ++) {
        const supItemParser = new Parser()
          .skip(curPos)
          .string('CharacterClassGameData', { length: 16, encoding: ENCODING })
  
        aiData.SupportedClasses.push(supItemParser.parse(data));
        curPos += TYPE_GUID;
      }
    }

      // Actonsets classes
    const asParser = new Parser()
      .skip(curPos)
      .int32le('ConditionalActionSetsLen');
    aiData = {...aiData, ...asParser.parse(data), ConditionalActionSet: []}
    curPos += 4;

    if (aiData.ConditionalActionSetsLen > 0) {
      const CAS_COUNT = aiData.ConditionalActionSetsLen;
  
      // Get types
      for (var i = 0; i < CAS_COUNT; i ++) {
        const casParser = new Parser()
          .skip(curPos)
          .int32le('Version')
          .string('TypeID', { length: 16, encoding: ENCODING })
          .int8('NameLen')
          .string('Name', { length: 'NameLen' })
          .int32le('ConditionsLen');

        const actionSet = {...casParser.parse(data), Conditions: []};
        aiData.ConditionalActionSet.push(actionSet);

        curPos += (TYPE_GUID + TYPE_VER) + (4 + aiData.ConditionalActionSet[i].NameLen + 1) + 4;
        
        if (actionSet.ConditionsLen > 0) {
          const CON_COUNT = actionSet.ConditionsLen;

          for (var i = 0; i < CON_COUNT; i ++) {
            const conParser = new Parser()
            .int32le('Version')
            .string('TypeID', { length: 16, encoding: ENCODING })
            .string('ConditionalSet', { length: 16, encoding: ENCODING })
            .bit1('Not')

            actionSet.Conditions.push(conParser.parse(data));

            curPos += (TYPE_GUID + TYPE_VER) + TYPE_GUID + 8;
          }
        }

        console.log('actionSet', actionSet)
        console.log('')
      }
    }

    // End parser
/*     const endParser = new Parser()
      .skip(curPos)
      .string('UniqueID', { length: 16, encoding: ENCODING })
      .bit1('CanEdit')
      .int8('DescriptionLen')
      .string('Description', { length: 'DescriptionLen' });
    aiData = {...aiData, ...endParser.parse(data)}
    curPos += TYPE_GUID; */

    //console.log(aiData);
  });
}


readEternityAiFile("./fighter2.customai")
readEternityAiFile("./fighter3.customai")