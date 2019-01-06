// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Panel from '../../components/Panel/Panel';
import Icon from '../../components/Icon/Icon';
import { ButtonCircular } from '../../components/Ui';
import type { MenuItem } from '../../types/menuitem';
import menuItemDefault, { MenuItemFactory } from '../../types/menuitem';
import './HomeLayout.css';

type Props = {};

class HomeLayout extends Component<Props> {
  props: Props;
  menuItems: MenuItem[];

  constructor(props: Props) {
    super(props);

    this.menuItems = [];
    ['scripts', 'settings'].forEach((key: string, index: number) => {
      this.menuItems.push(
        MenuItemFactory({ ...menuItemDefault, key }, Date.now())
      );
    });
  }

  render() {
    return (
      <Panel classes="HomeLayout">
        {this.menuItems.map(item => {
          return (
            <div key={item.id} className="HomeLayout__item">
              <Link to={item.route} className="HomeLayout__link">
                <ButtonCircular classes="HomeLayout__icon" visual={true}>
                  <Icon type={item.icon} />
                </ButtonCircular>
                <span className="HomeLayout__title">{item.label}</span>
                <span className="HomeLayout__description">
                  {item.description}
                </span>
              </Link>
            </div>
          );
        })}
      </Panel>
    );
  }
}

export default HomeLayout;
