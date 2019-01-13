//@flow

import * as React from 'react';
import classNames from 'classnames';
import './FieldWrap.css';

type Props = {
  children?: React.Node,
  classes: string,
};

/**
 * A wrapping component for UI elements.
 */
class FieldWrap extends React.PureComponent<Props> {
  static defaultProps = {
    children: null,
  };

  props: Props;

  render() {
    return (
      <div
        className={classNames({
          FieldWrap: true,
          [this.props.classes]: !!this.props.classes,
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

export default FieldWrap;
