// @flow

import * as React from 'react';
import './Form.css';

type Props = {
  children?: React.Node,
  onSubmit?: () => boolean,
};

/**
 * A form to hold fields.
 */
class Form extends React.PureComponent<Props> {
  static defaultProps = {
    children: null,
    onSubmit: null,
  };

  props: Props;

  render() {
    return (
      <form
        className="Form"
        method="get"
        action="#"
        onSubmit={this.props.onSubmit}
      >
        {this.props.children}
      </form>
    );
  }
}

export default Form;
