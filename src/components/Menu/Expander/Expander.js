// @flow

import React, { Component } from 'react';
import Inner from '../Inner/Inner';
import { ICON_CONTRACTOR, ICON_EXPANDER } from '../../../constants/icons';
import { trans } from '../../Translation/Translation';

type Props = {
  expanded: false,
  onClick: onClick => void,
};

export class Expander extends Component<Props> {
  props: Props;

  render() {
    const label = trans(this.props.expanded ? 'Contract' : 'Expand', 'Expander');

    return (
      <div className="Menu__item Menu__expander" title={label} onClick={this.props.onClick}>
        <span className="Menu__link">
          <Inner icon={this.props.expanded ? ICON_CONTRACTOR : ICON_EXPANDER} label={label} />
        </span>
      </div>
    );
  }
}

export default Expander;
