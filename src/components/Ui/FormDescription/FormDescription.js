// @flow

import * as React from 'react';
import './FormDescription.css';

type Props = {
  text: string,
};

/**
 * A header in a form.
 */
class FormDescription extends React.PureComponent<Props> {
  static defaultProps = {
    text: '',
  };

  props: Props;

  render() {
    return <p className="FormDescription">{this.props.text}</p>;
  }
}

export default FormDescription;
