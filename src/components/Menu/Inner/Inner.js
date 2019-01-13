// @flow

import React, { Fragment, Component } from 'react';
import Icon from '../../Icon/Icon';
import type { MenuItem } from '../../../types/menu';

type Props = {
  ...MenuItem,
};

export class Inner extends Component<Props> {
  props: Props;

  render() {
    return (
      <Fragment>
        <span className="Menu__icon">
          <Icon type={this.props.icon} />
        </span>
        <span className="Menu__title">{this.props.label}</span>
        {this.props.description && <span className="Menu__description">{this.props.description}</span>}
      </Fragment>
    );
  }
}

export default Inner;
