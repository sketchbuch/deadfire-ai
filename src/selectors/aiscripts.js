// @flow

import { createSelector } from 'reselect';

const getAiscripts = state => state.aiscripts;

const getVisibleAiscripts = createSelector(
  [getAiscripts],
  aiscripts => {
    if (aiscripts.length > 0) {
      return aiscripts.slice(0, 10);
    }

    return [];
  }
);

export default getVisibleAiscripts;
