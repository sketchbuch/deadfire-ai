// @flow

import { SIDEBAR_LOADING, SIDEBAR_LOADING_ERROR, SIDEBAR_LOADING_SUCCESS } from '../../constants/actionTypes';
import * as sidebarActions from '../sidebarActions';
import type { Domains } from '../../types/domains';
import type { ErrorObj } from '../../types/error';

describe('Actions: SidebarActions:', () => {
  const domain: Domains = 'settings';

  test('loading() returns a SIDEBAR_LOADING action', () => {
    const expectedAction = {
      type: SIDEBAR_LOADING,
      payload: { domain },
    };
    expect(sidebarActions.loading(domain)).toEqual(expectedAction);
  });

  test('error() returns a SIDEBAR_LOADING_ERROR action', () => {
    const errorObj: ErrorObj = {
      errorTitle: 'An error',
    };
    const expectedAction = {
      type: SIDEBAR_LOADING_ERROR,
      payload: {
        domain,
        errorObj,
      },
    };
    expect(sidebarActions.error(domain, errorObj)).toEqual(expectedAction);
  });

  test('success() returns a SIDEBAR_LOADING_SUCCESS action', () => {
    const files: string[] = ['file1.aicustom', 'file2.aicustom', 'file3.aicustom'];
    const expectedAction = {
      type: SIDEBAR_LOADING_SUCCESS,
      payload: {
        domain,
        files,
      },
    };
    expect(sidebarActions.success(domain, files)).toEqual(expectedAction);
  });
});
