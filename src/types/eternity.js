// @flow

export type EternityDataObj = {
  debugName: string,
  labelIndex: number, // ID of label in string tables.
  id: string,
  index: number, // Original unsorted index in the redux store array.
  label: string, // Either debugName or the correct string table translation.
  type: string,
};
