// @flow

/**
 * Sidebar type def.
 */

export type SidebarState = {
  error: boolean,
  loading: boolean,
};

const sidebarDefault: SidebarState = {
  error: false,
  loading: true,
};

export default sidebarDefault;
