// @flow

import './SidebarItem.css';
import React, { Component } from 'react';
import SidebarInner from '../Inner/SidebarInner';
import type { Aiscript } from '../../../types/aiscript';
import type { Domains } from '../../../types/domains';

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
    return (
      <li className="SidebarItem" title={this.props.item.getTooltip()}>
        <SidebarInner
          description={this.props.item.getDescription()}
          icon={this.props.item.getIcon()}
          label={this.props.item.getLabel()}
          link={this.props.item.getUrl('link')}
          linkEdit=""
        />
      </li>
    );
  }
}

export default SidebarItem;
