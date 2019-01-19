// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Panel from '../../components/Panel/Panel';
import { Sidebar, SidebarFooter, SidebarHeader } from '../../components/Sidebar';
import './ScriptsLayout.css';

type Props = {
  loading: boolean,
  dispatch: Function,
};

class ScriptsLayout extends Component<Props> {
  props: Props;

  render() {
    const { dispatch, loading } = this.props;

    return (
      <Panel classes="ScriptsLayout">
        <Sidebar dispatch={dispatch} loading={loading}>
          <SidebarHeader title="Sidebar" />
          <SidebarFooter />
        </Sidebar>
      </Panel>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  loading: state.sidebar.loading,
});

export default connect(mapStateToProps)(ScriptsLayout);
