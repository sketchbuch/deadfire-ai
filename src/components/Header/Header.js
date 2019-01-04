// @flow

import React, { Component } from 'react';
import Icon from '../Icon/Icon';
import { ICON_BRAND } from '../../constants/icons';
import './Header.css';

type Props = {
};

export class Header extends Component<Props> {
  props: Props;

  render() {
    return (
      <header className="Header">
        <span className="Header__logo">
          <Icon type={ICON_BRAND} />
        </span>
        <h1 className="Header__title">Deadfire AI Editor</h1>
      </header>
    )
  }
}


export default Header;
