// @flow

import React, { Component, Fragment } from 'react';

type Props = {
  errorMsg: string
};


class ErrorLayout extends Component<Props> {
  props: Props;
  
  static defaultProps = {
    errorMsg: '',
  };

  render() {
    return (
      <Fragment>
        <h2>Error</h2>
        <p>{this.props.errorMsg}</p>
      </Fragment>
    )
  }
}


export default ErrorLayout;
