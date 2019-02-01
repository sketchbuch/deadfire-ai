// @flow

import React from 'react';
import './Icon.css';

type Props = {
  type: string,
};

/**
 * Iconfont Icon component.
 */
const Icon = (props: Props) => <i className={'Icon icofont icofont-' + props.type} />;

export default Icon;
