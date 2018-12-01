const Parser = require("binary-parser").Parser;
const fs = require('fs');
const uuidParse = require('uuid-parse');
const FILE_PATH = "./fighter.customai";
const ENCODING = 'hex';

/**
* Loads a PoE zip file
*/
function readEternityFile2() {
  fs.readFile(FILE_PATH, function (err, data) {
    const parser = new Parser()
      .int32le('HeaderVersion')
      .int32le('Types')
      .nest("Type", {
        type: new Parser()
          .string('TypeID', { length: 16, encoding: ENCODING })
          .int32le('Version')
      })
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
      ;
    
    const result = parser.parse(data);

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
    console.log(uuidParse.unparse(result2.TypeID));
  });
}


//readEternityFile()
readEternityFile2()