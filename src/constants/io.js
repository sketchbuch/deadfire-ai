// @flow

export const AI_FILE = '.customai';
export const DATA_FOLDER = '/Storage/';
export const FILE_SETTINGS = 'Settings';
export const FILE_TYPE = 'json';

// AI Script constants
export const ENCODING = 'hex';
export const GUID = 16;
export const INT32 = 4;
export const INT8 = 1;
export const BOOL = INT8;

// Eternity Data File Constants
export const ETERNITY_PATH = 'PillarsOfEternityII_Data/exported/design/gamedata/';
export const ETERNITY_PATH_TRANS = 'PillarsOfEternityII_Data/exported/localized/%LANG%/text/game/';

export const eternityFiles = [
  {
    key: 'abilities',
    path: ETERNITY_PATH + 'abilities.gamedatabundle',
    trans: ETERNITY_PATH_TRANS + 'abilities.stringtable',
    type: 'Game.GameData.GenericAbilityGameData, Assembly-CSharp',
  },
  {
    key: 'ai',
    path: ETERNITY_PATH + 'ai.gamedatabundle',
    trans: ETERNITY_PATH_TRANS + 'customai.stringtable',
    type: 'Game.GameData.CustomAIConditionalScriptSetGameData, Assembly-CSharp',
  },
  {
    key: 'gui',
    path: ETERNITY_PATH + 'gui.gamedatabundle',
    trans: ETERNITY_PATH_TRANS + 'gui.stringtable',
    type: 'Game.GameData.AITargetingPreferenceGameData, Assembly-CSharp',
  },
];
