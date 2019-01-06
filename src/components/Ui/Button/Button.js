//@flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import { ICON_BUSY } from '../../../constants/icons';
import type { EventHandler } from '../../../types/functions';
import './Button.css';

type Props = {
  busy: boolean,
  buttontype?: 'default' | 'warning',
  children?: React.Node,
  classes?: string,
  disabled?: boolean,
  name?: string,
  onClick?: EventHandler | null,
  title?: string,
  type?: string,
};

/**
 * A button.
 */
class Button extends React.PureComponent<Props> {
  static defaultProps = {
    busy: false,
    buttontype: 'default',
    children: null,
    disabled: false,
    onClick: null,
    type: 'button',
  };

  props: Props;

  render() {
    const {
      buttontype,
      classes,
      children,
      disabled,
      busy,
      name,
      onClick,
      title,
      type,
    } = this.props;

    return (
      <span
        className={classNames({
          Button: true,
          [classes]: !!classes,
          'Button--busy': busy,
        })}
      >
        <button
          className="Button__btn"
          data-buttontype={buttontype}
          disabled={disabled}
          name={name}
          onClick={onClick}
          title={title}
          type={type}
        >
          {children}
        </button>
        {busy && (
          <span className="Button__busy">
            <Icon type={ICON_BUSY} />
          </span>
        )}
      </span>
    );
  }
}

export default Button;
