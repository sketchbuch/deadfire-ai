//@flow

import * as React from 'react';
import classNames from 'classnames';
import type { ButtonType } from '../../../types/button';
import type { EventHandler } from '../../../types/functions';
import './ButtonCircular.css';

type Props = {
  action: string,
  buttontype?: ButtonType,
  children?: React.Node,
  classes?: string,
  disabled?: boolean,
  name?: string,
  onClick?: EventHandler | null,
  title?: string,
  type?: string,
  visual?: boolean,
};

/**
 * A round action button.
 */
class ButtonCircular extends React.PureComponent<Props> {
  static defaultProps = {
    buttontype: 'default',
    children: null,
    disabled: false,
    onClick: null,
    type: 'button',
    visual: false,
  };

  props: Props;

  render() {
    const { action, buttontype, children, classes, disabled, name, onClick, title, type, visual } = this.props;

    const tagName = visual ? 'span' : 'button';

    return React.createElement(
      tagName,
      {
        className: classNames('ButtonCircular', {
          [classes]: !!classes,
        }),
        'data-action': action,
        'data-buttontype': buttontype,
        disabled: disabled,
        name: name,
        onClick: onClick,
        title: title,
        type: type,
      },
      children
    );
  }
}

export default ButtonCircular;
