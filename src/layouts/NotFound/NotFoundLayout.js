// @flow

import React, { Component } from 'react';
import Panel from '../../components/Panel/Panel';

type Props = {
};


class NotFoundLayout extends Component<Props> {
  props: Props;

  render() {
    return (
      <Panel>
        <h2>Not Found</h2>
      </Panel>
    )
  }
}


export default NotFoundLayout;
