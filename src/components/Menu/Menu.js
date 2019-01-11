// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import Expander from './Expander/Expander';
import Item from './Item/Item';
import menuItemDefault, { MenuItemFactory } from '../../types/menuitem';
import './Menu.css';

type Props = {
  classes?: string,
  expanded: boolean,
  toggleMenu: (expanded: boolean) => void,
};

export class Menu extends Component<Props> {
  props: Props;
  menuItems: MenuItem[];
  handleExpanderClick: () => void;

  constructor(props: Props) {
    super(props);

    this.menuItems = [];
    ['scripts', 'settings'].forEach((key: string, index: number) => {
      this.menuItems.push(MenuItemFactory({ ...menuItemDefault, key }, Date.now()));
    });

    this.handleExpanderClick = this.handleExpanderClick.bind(this);
  }

  handleExpanderClick() {
    console.log('handleExpanderClick()', this.props.expanded, !this.props.expanded);
    this.props.toggleMenu(this.props.expanded);
  }

  render() {
    const { expanded, classes } = this.props;

    return (
      <section
        className={classNames({
          Menu: true,
          [classes]: !!classes,
          'Menu--expanded': !!expanded,
        })}
      >
        {this.menuItems.map(item => (
          <Item key={item.id} {...item} />
        ))}
        <Expander expanded={expanded} onClick={this.handleExpanderClick} />
      </section>
    );
  }
}

export default Menu;
