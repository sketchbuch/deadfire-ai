// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Inner from '../Inner/Inner';
import type { MenuItem } from '../../../types/menu';

type Props = {
  ...MenuItem,
};

export class Item extends Component<Props> {
  props: Props;

  render() {
    const { description, icon, id, label, route } = this.props;

    return (
      <div
        key={id}
        className={classNames({
          Menu__item: true,
          'Menu__item-selected': route === window.location.pathname,
        })}
      >
        <Link to={route} className="Menu__link" title={label}>
          <Inner description={description} icon={icon} label={label} />
        </Link>
      </div>
    );
  }
}

export default Item;
