// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { ICON_BRAND } from '../../constants/icons';
import { ROUTE_HOME } from '../../constants/routes';
import './Header.css';

type Props = {
};

export class Header extends Component<Props> {
  props: Props;

  render() {
    return (
      <header className="Header">
        <Link to={ROUTE_HOME} className="Header__link">
          <span className="Header__logo">
            <Icon type={ICON_BRAND} />
          </span>
          <h1 className="Header__title">Deadfire AI Editor</h1>
        </Link>
      </header>
    )
  }
}


export default Header;
