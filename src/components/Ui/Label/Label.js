//@flow

import * as React from 'react';
import classNames from 'classnames';
import './Label.css';

type Props = {
  children?: React.Node,
  classes: string,
  htmlFor: string,
};

/**
 * A label for FieldWrap components.
 */
class Label extends React.Component<Props> {
  static defaultProps = {
    children: null,
  };

  props: Props;

  render() {
    return (
      <label
        className={classNames('Label', {
          [this.props.classes]: !!this.props.classes,
        })}
        htmlFor={this.props.htmlFor}
      >
        {this.props.children}
      </label>
    );
  }
}

export default Label;
