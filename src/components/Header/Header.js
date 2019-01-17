// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import Translation from '../Translation/Translation';
import { ICON_BRAND } from '../../constants/icons';
import { ROUTE_HOME } from '../../constants/routes';
import './Header.css';

type Props = {};

export class Header extends Component<Props> {
  props: Props;

  render() {
    let label = 'Deadfire AI Editor';
    if (window.app && window.app.translations[window.app.current]) {
      label = <Translation name="Name" ns="App" />;
      console.debug('test');
    }

    return (
      <header className="Header">
        <Link to={ROUTE_HOME} className="Header__link">
          <span className="Header__logo">
            <Icon type={ICON_BRAND} />
          </span>
          <h1 className="Header__title">{label}</h1>
        </Link>
      </header>
    );
  }
}

export default Header;
