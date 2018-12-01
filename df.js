const Parser = require("binary-parser").Parser;
const fs = require('fs');
const uuidParse = require('uuid-parse');
const FILE_PATH = "./fighter.customai";
const ENCODING = 'hex';
const SKIP_TO_TYPES = 8;
const TYPE_GUID = 16;
const TYPE_VER = 4;

/**
* Reads and parses a PoE2 user AI binary file.
*/
function readEternityAiFile() {
  fs.readFile(FILE_PATH, function (err, data) {
    const aiHeader = new Parser()
      .int32le('HeaderVersion')
      .int32le('TypesLen');
    
    let aiData = aiHeader.parse(data);
    aiData.Types = []
    const TYPE_COUNT = aiData.TypesLen;
    let curPos = SKIP_TO_TYPES;

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

    const nameParser = new Parser()
      .skip(curPos)
      .int8('NameLen')
      .string('Name', { length: 'NameLen' })
      .int32le('OldSupportedClassesLen')

    aiData = {...aiData, ...nameParser.parse(data), OldSupportedClasses: []}
    curPos += (4 + aiData.NameLen + 4);

    if (aiData.OldSupportedClassesLen > 0) { // To do...

    }

    console.log(aiData);







      // 52e868336eb97b4babcbce9f3a0a41de

/*     const parser = new Parser()
      .int32le('HeaderVersion')
      .int32le('Types')c
      .buffer('test', { length: 'Types'})
      .nest("Type", {
        type: new Parser()
          .string('TypeID', { length: 16, encoding: ENCODING })
          .int32le('Version')
      }) */
      /* .string('TypeID', { length: 16, encoding: ENCODING })
      .int32le('NameLen')
      .string('Name', { length: 'NameLen', encoding: ENCODING })
      .int32le('OldSupportedClasses')
      .nest("OldSupportedClass", {
        type: new Parser()
          .int32le('CharacterClass')
      })
      .int32le('OldSupportedClasses')
      .nest("SupportedClass", {
        type: new Parser()
          .string('CharacterClassGameData', { length: 16, encoding: ENCODING })
      })
      .int32le('ConditionalActionSets') */
    
/*     const result = parser.parse(data);

    console.log(result);
    const parser2 = new Parser()
      .skip(8 + result.Types)
      .int32le('NameLen')
      .string('Name', { length: 'NameLen', encoding: ENCODING })
      .int32le('OldSupportedClasses')
      .nest("OldSupportedClass", {
        type: new Parser()
          .int32le('CharacterClass')
      })

    const result2 = parser2.parse(data);
    console.log(result2);
    console.log(uuidParse.unparse(result2.TypeID)); */
  });
}


//readEternityFile()
readEternityAiFile()