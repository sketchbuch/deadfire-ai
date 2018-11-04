// @flow

import reducer from '../app';
import appDefault from '../../types/app';
import {
  APP_ERRORED,
  APP_LOADED,
} from '../../constants/actionTypes';


/**
* Classes Reducer Tests
*/

describe('Reducer: App', () => {
  const INITIAL_STATE = {...appDefault};

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  test('APP_ERRORED should return with error = true', () => {
    const testState = {...appDefault, error: true };
    expect(reducer(INITIAL_STATE, { type: APP_ERRORED })).toEqual(testState);
  });
});
