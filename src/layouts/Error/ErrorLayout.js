// @flow

import React, { Component } from 'react';
import Panel from '../../components/Panel/Panel';

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
      <Panel>
        <h2>Error</h2>
        <p>{this.props.errorMsg}</p>
      </Panel>
    )
  }
}


export default ErrorLayout;
