// @flow

import * as React from 'react';
import SidebarItem from '../Item/SidebarItem';
import type { Domains } from '../../../types/domains';
import './SidebarList.css';

type Props = {
  items: Array<Object>,
  listType: Domains,
  noItemsTxt: string,
};

type State = {};

/**
 * Sidebar list of items
 */
class SidebarList extends React.Component<Props, State> {
  static defaultProps = {
    items: [],
  };

  props: Props;
  state: State;

  render() {
    if (this.props.items.length > 0) {
      return (
        <ul className="SidebarList" data-type={this.props.listType}>
          {this.props.items.map(item => {
            return <SidebarItem item={item} itemType={this.props.listType} key={item.id} />;
          })}
        </ul>
      );
    } else {
      return <p>{this.props.noItemsTxt}</p>;
    }
  }
}

export default SidebarList;
