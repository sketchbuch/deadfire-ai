// @flow

import { SIDEBAR_LOADING, SIDEBAR_LOADING_ERROR, SIDEBAR_LOADING_SUCCESS } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';
import type { Domains } from '../../types/domains';
import type { ErrorObj } from '../../types/fsObject';

export function error(domain: Domains, errorObj: ErrorObj): ActionCreator {
  return { type: SIDEBAR_LOADING_ERROR, payload: { domain, errorObj } };
}

export function loading(domain: Domains): ActionCreator {
  return { type: SIDEBAR_LOADING, payload: { domain } };
}

export function success(domain: Domains, files: string[], aiPath: string): ActionCreator {
  return { type: SIDEBAR_LOADING_SUCCESS, payload: { domain, files, aiPath } };
}
