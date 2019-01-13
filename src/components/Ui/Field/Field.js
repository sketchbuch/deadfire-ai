//@flow

import * as React from 'react';
import classNames from 'classnames';
import './Field.css';

type Props = {
  children?: React.Node,
  classes: string,
};

/**
 * A value container for FieldWrap components.
 */
class Field extends React.PureComponent<Props> {
  static defaultProps = {
    children: null,
  };

  props: Props;

  render() {
    return (
      <div
        className={classNames({
          Field: true,
          [this.props.classes]: !!this.props.classes,
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Field;
