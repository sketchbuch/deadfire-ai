// @flow

import { GUID, INT32 } from '../../constants/io';
import { UUID } from '../utils/fs';
const Parser = require('binary-parser').Parser;

/**
 * Parses the contents of an AI file just up until the name.
 */
export function parseQuick(fileContents: string) {
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
    .string('Name', { length: 'NameLen' });

  aiData = { ...aiData, ...nameParser.parse(fileContents) };

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
