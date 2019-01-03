//@flow

import * as React from 'react';
import './FieldError.css';

type Props = {
  errors: string[],
};

/**
* A wrapping component for UI elements.
*/
class FieldError extends React.PureComponent<Props> {
  static defaultProps = {
    errors: [],
  };

  props: Props;

  render() {
    return (
      <p className="FieldError">
        {this.props.errors[0]}
      </p>
    )
  }
}


export default FieldError;
