// @flow

import React, { Component } from 'react';
import Panel from '../../components/Panel/Panel';
import './HomeLayout.css';

type Props = {};

class HomeLayout extends Component<Props> {
  props: Props;

  render() {
    return <Panel classes="HomeLayout">Home layout</Panel>;
  }
}

export default HomeLayout;
