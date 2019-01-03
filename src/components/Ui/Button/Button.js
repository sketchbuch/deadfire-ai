//@flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import { ICON_BUSY } from '../../../constants/icons';
import type { EventHandlerType } from '../../../types/functions';
import './Button.css';

type Props = {
  busy: boolean,
  buttontype?: 'default' | 'warning',
  children?: React.Node,
  classes?: string,
  disabled?: boolean,
  name?: string,
  onClick?: EventHandlerType | null,
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
      <button
        className={classNames({
          Button: true,
          [classes]: !!classes,
        })}
        data-buttontype={buttontype}
        disabled={disabled}
        name={name}
        onClick={onClick}
        title={title}
        type={type}
      >
        {children}{busy && <span className="Button__busy"><Icon type={ ICON_BUSY } /></span>}
      </button>
    )
  }
}


export default Button;
