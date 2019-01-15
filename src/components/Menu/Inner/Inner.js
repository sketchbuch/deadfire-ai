// @flow

import React, { Fragment, Component } from 'react';
import Icon from '../../Icon/Icon';
import type { MenuItem } from '../../../types/menu';

type Props = {
  ...MenuItem,
  expander: boolean,
};

export class Inner extends Component<Props> {
  props: Props;

  render() {
    return (
      <Fragment>
        <span className="Menu__icon">
          <Icon type={this.props.icon} />
        </span>
        {!this.props.expander && (
          <div className="Menu__label">
            <span className="Menu__title">{this.props.label}</span>
            {this.props.description && <span className="Menu__description">{this.props.description}</span>}
          </div>
        )}
      </Fragment>
    );
  }
}

export default Inner;
