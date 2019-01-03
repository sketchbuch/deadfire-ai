// @flow

import * as React from 'react';
import './Panel.css';

type Props = {
  children?: React.Node,
};

export class Panel extends React.Component<Props> {
  props: Props;
  
  static defaultProps = {
    children: null,
 };

  render() {
    return (
      <section className="Panel">
        {this.props.children}
      </section>
    )
  }
}


export default Panel;
