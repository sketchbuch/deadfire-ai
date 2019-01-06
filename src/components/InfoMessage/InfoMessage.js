// @flow

import * as React from 'react';
import Icon from '../Icon/Icon';
import { ICON_WARNING } from '../../constants/icons';
import './InfoMessage.css';

type Props = {
  children?: React.Node,
  headline: string,
  icon: string,
  message?: string,
};

export class InfoMessage extends React.PureComponent<Props> {
  props: Props;
  
  static defaultProps = {
    children: null,
    icon: ICON_WARNING,
 };

  render() {
    const {
      children,
      headline,
      icon,
      message,
    } = this.props;

    return (
      <section className="InfoMessage">
        <span className="InfoMessage__icon">
          <Icon type={icon} />
        </span>
        <h1 className="InfoMessage__headline">{headline}</h1>
        {message && <p className="InfoMessage__message">{message}</p>}
        {children && <div className="InfoMessage__additional">{children}</div>}
      </section>
    )
  }
}


export default InfoMessage;
