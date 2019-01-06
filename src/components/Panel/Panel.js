// @flow

import * as React from 'react';
import classNames from 'classnames';
import './Panel.css';

type Props = {
  children?: React.Node,
  classes?: string,
};

export class Panel extends React.Component<Props> {
  props: Props;

  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <section
        className={classNames({
          Panel: true,
          [this.props.classes]: !!this.props.classes,
        })}
      >
        {this.props.children}
      </section>
    );
  }
}

export default Panel;
