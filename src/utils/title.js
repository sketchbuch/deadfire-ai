// @flow

import { trans } from '../components/Translation/Translation';

/**
 * Sets the window title.
 *
 * @param string titleTxt The text to used as the window title.
 */
export default function setTitle(titleTxt: string = '') {
  const trimmedTxt = titleTxt.trim();

  if (trimmedTxt === '') {
    document.title = trans('Name', 'App');
  } else {
    document.title = trans('Name', 'App') + titleSep + trimmedTxt;
  }
}

export const titleSep = ' - ';
