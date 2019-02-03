// @flow

type Type = {
  TypeID: string,
  Version: number,
};

type SupportedClass = {
  CharacterClassGameData: string,
};

type ActionSetCondition = {
  Version: number,
  TypeID: string,
  ConditionalSet: string,
  Not: number,
};

type ActionSetAction = {
  Version: number,
  TypeID: string,
  ActionType: number,
  AbilityPackage: string,
  Ability: string,
  Consumable: string,
  TargetingFilter: string,
  TargetingPreference: string,
  AllowedMovement: number,
  Cooldown: number,
};

export type ActionSet = {
  TypeID: string,
  Version: number,
  NameLen: number,
  Name: string,
  ConditionsLen: number,
  Conditions: ActionSetCondition[],
  ActionLen: number,
  Actions: ActionSetAction[],
  AllowedMovement: number,
  Cooldown: number,
};

export type ByteStructure = {
  HeaderVersion: number,
  TypesLen: number,
  Types: Type[],
  TypeID: string,
  NameLen: number,
  Name: string,
  OldSupportedClassesLen: number,
  OldSupportedClasses: number[],
  SupportedClassesLen: number,
  SupportedClasses: SupportedClass[],
  ConditionalActionSetsLen: number,
  ConditionalActionSets: ActionSet[],
  UniqueID: string,
  CanEdit: number,
  DescriptionLen: number,
  Description: string,
};

const byteStructureDefault: ByteStructure = {
  HeaderVersion: -1,
  TypesLen: -1,
  Types: [],
  TypeID: '',
  NameLen: -1,
  Name: '',
  OldSupportedClassesLen: -1,
  OldSupportedClasses: [],
  SupportedClassesLen: -1,
  SupportedClasses: [],
  ConditionalActionSetsLen: -1,
  ConditionalActionSets: [],
  UniqueID: '',
  CanEdit: -1,
  DescriptionLen: -1,
  Description: '',
};

export default byteStructureDefault;
