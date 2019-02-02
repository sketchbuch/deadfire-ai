// @flow

import React from 'react';
import Translation from '../Translation/Translation';
import './CollapseLink.css';

type Props = {
  name: string,
  ns: string,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
};

/**
 * CollapseLink link with underlining via after
 */
const CollapseLink = (props: Props) => (
  <button className="CollapseLink" onClick={props.onClick}>
    <Translation name={props.name} ns={props.ns} />
  </button>
);

export default CollapseLink;
