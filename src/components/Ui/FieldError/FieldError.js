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
    console.log(this.props.errors);
    if (this.props.errors.length < 1) {
      return null;
    }

    return (
      <div className="FieldError">
        {this.props.errors.map(item => {
          const key = item.toLowerCase().replace(/[^A-Z0-9]+/gi, '');

          return (
            <p className="FieldError__error" key={key}>
              {item}
            </p>
          );
        })}
      </div>
    );
  }
}

export default FieldError;
