// @flow

import domains from '../constants/domains';

export type Domains = $Values<typeof domains>;

export type DomainBase = {
  contains: (term: string, anywhere: boolean) => boolean,
  created: number,
  getDescription: () => string,
  getIcon: () => string,
  getLabel: () => string,
  getTooltip: () => string,
  getUrl: (linkType: string) => string,
  id: string,
  updated: number,
};

const domainBaseDefault: DomainBase = {
  contains: () => {},
  created: -1,
  getDescription: () => {},
  getIcon: () => {},
  getLabel: () => {},
  getTooltip: () => {},
  getUrl: () => {},
  id: '',
  updated: -1,
};

export default domainBaseDefault;
