// @flow

/**
* Function type defs.
*/

export type DispatchType = (action: any) => void;
export type EventHandler = (event: SyntheticInputEvent<HTMLInputElement>) => void | boolean;