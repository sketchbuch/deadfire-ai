// @flow

import {
  SETTINGS_LOAD_SUCCESS,
} from '../constants/actionTypes';


/**
* Settings Reducer.
*/

export default function reducer(state: Object = {}, action: Object) {
  switch (action.type) {
    case SETTINGS_LOAD_SUCCESS:
      if (action.payload && action.payload.settings !== undefined) return {...action.payload.settings};

      break;

    default:
      return state;
  }

  return state;
}
