// @flow

import * as React from 'react';
import SidebarItem from '../Item/SidebarItem';
import type { Domains } from '../../../types/domains';
import { sortObjectsAz } from '../../../utils/sort';
import './SidebarList.css';

type Props = {
  curPage: number,
  dispatch: Function,
  filter: string,
  items: Array<Object>,
  listType: Domains,
  noItemsTxt: string,
  onChange: (curPage: number) => void,
  pagesToShow: number,
  perPage: number,
  sortOrder: Array<string>,
  term: string,
  usePb: boolean,
};

type State = {};

/**
 * Sidebar list of items
 */
class SidebarList extends React.Component<Props, State> {
  static defaultProps = {
    builder: false,
    curPage: 1,
    description: null,
    filter: '',
    items: [],
    listType: 'class',
    onChange: null,
    pagesToShow: 3,
    perPage: 20,
    sortOrder: ['updated'],
    term: '',
    usePb: false,
  };

  props: Props;
  state: State;

  getSortedItems() {
    let sortedItems = sortObjectsAz(this.props.items, this.props.sortOrder);

    if (this.props.filter) {
      if (this.props.filter !== 'category-all') {
        if (this.props.filter === 'category-nocat') {
          sortedItems = sortedItems.filter(item => item.categories.length === 0);
        } else {
          sortedItems = sortedItems.filter(item => item.categories.includes(this.props.filter));
        }
      }
    }

    if (this.props.term !== '') {
      const displayProp = this.props.listType === 'pupil' ? this.props.sortOrder[0] : undefined;
      sortedItems = sortedItems.filter(item => item.contains(this.props.term, false, displayProp));
    }

    return sortedItems;
  }

  renderContent() {
    let sortedItems = this.getSortedItems();
    const itemForPaging = sortedItems.length;

    if (itemForPaging > 0) {
      let classes = 'SidebarList';

      return (
        <ul className={classes} data-type={this.props.listType}>
          {sortedItems.map(item => {
            return (
              <SidebarItem item={item} itemType={this.props.listType} key={item.id} sortOrder={this.props.sortOrder} />
            );
          })}
        </ul>
      );
    } else {
      return <p>{this.props.noItemsTxt}</p>;
    }
  }

  render() {
    return this.renderContent();
  }
}

export default SidebarList;
