// @flow

import { generateId, ucFirst } from '../utils';
import { trans } from '../components/Translation/Translation';
import * as routes from '../constants/routes';
import * as icons from '../constants/icons';


/**
* Home Menu Item def.
*/

export type MenuItem = {
  description: string,
  icon: string,
  id: string,
  key: string,
  label: string,
  route: string,
};

const menuItemDefault: MenuItem = {
  description: '',
  icon: '',
  id: '',
  key: '',
  label: '',
  route: '',
};

/**
* Returns an object of MenuItem based on menuitemObj but with additional props set.
*
* @param MenuItem menuitemObj The initial class object.
* @return MenuItem The new menu item object.
*/
export function MenuItemFactory(menuitemObj: MenuItem, ts: number): MenuItem {
  const keyUpper = menuitemObj.key.toUpperCase();
  const keyCapped = ucFirst(menuitemObj.key);

  return {
    ...menuItemDefault,
    ...menuitemObj,
    description: trans(keyCapped + 'Description', 'HomeLayout'),
    icon: icons['ICON_' + keyUpper],
    id: generateId(getMenuItemIdStr(menuitemObj), ts),
    label: trans(keyCapped, 'HomeLayout'),
    route: routes['ROUTE_' + keyUpper],
  };
}

/**
* Returns a string to be used when creating an ID for a menu item.
*
* @param MenuItem menuitemObj The class record.
* @return string The string to be used in creating the ID.
*/
export function getMenuItemIdStr(menuitemObj: MenuItem): string {
  return 'menuitem:' + menuitemObj.key;
}


export default menuItemDefault;
