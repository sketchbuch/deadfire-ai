// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import SidebarInner from '../Inner/SidebarInner';
import type { Aiscript } from '../../../types/aiscript';
import type { Domains } from '../../../types/domains';
import { PARSE_STATE_ERROR } from '../../../constants/misc';
import './SidebarItem.css';

type Props = {
  item: Aiscript,
  itemType: Domains,
  sortOrder: Array<string>,
};

/**
 * An item in a sidebar list.
 */
class SidebarItem extends Component<Props> {
  props: Props;

  render() {
    const isError = this.props.item.parseState === PARSE_STATE_ERROR;
    return (
      <li
        className={classNames('SidebarItem', {
          'SidebarItem--error': isError,
        })}
        title={this.props.item.getTooltip()}
      >
        <SidebarInner
          description={this.props.item.getDescription()}
          icon={this.props.item.getIcon()}
          isError={isError}
          label={this.props.item.getLabel()}
          link={this.props.item.getUrl('link')}
          linkEdit=""
        />
      </li>
    );
  }
}

export default SidebarItem;
