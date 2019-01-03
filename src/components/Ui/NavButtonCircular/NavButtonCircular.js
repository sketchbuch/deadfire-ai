//@flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import type { ButtonType } from '../../../types/button';
import '../ButtonCircular/ButtonCircular.css';

type Props = {
  action: string,
  buttontype?: ButtonType,
  children?: React.Node,
  classes?: string,
  disabled?: boolean,
  title?: string,
  to: string,
  type?: string,
};


/**
* A round action react router Nav link.
*/
class NavButtonCircular extends React.PureComponent<Props> {
  static defaultProps = {
    action: '',
    buttontype: 'default',
    children: null,
    disabled: false,
    title: '',
    type: 'button',
  };

  props: Props;

  render() {
    const {
      action,
      buttontype,
      children,
      classes,
      disabled,
      title,
      to,
      type,
    } = this.props;
    
    return (
        <Link
          className={classNames({
            ButtonCircular: true,
            [classes]: !!classes,
          })}
          data-action={action}
          data-buttontype={buttontype}
          disabled={disabled}
          title={title}
          to={to}
          type={type}
        >
          {children}
        </Link>
    )
  }
}


export default NavButtonCircular;
