// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Panel from '../../components/Panel/Panel';
import type { Aiscript } from '../../types/aiscript';
import { DOMAIN_SCRIPTS } from '../../constants/domains';
import { Sidebar, SidebarFooter, SidebarHeader } from '../../components/Sidebar';
import './ScriptsLayout.css';

type Props = {
  aiscripts: Aiscript[],
  loading: boolean,
  dispatch: Function,
};

class ScriptsLayout extends Component<Props> {
  props: Props;

  render() {
    const { aiscripts, dispatch, loading } = this.props;

    return (
      <Panel classes="ScriptsLayout">
        <Sidebar dispatch={dispatch} domain={DOMAIN_SCRIPTS} itemCount={aiscripts.length} loading={loading}>
          <SidebarHeader title="Sidebar" /># of scripts: {aiscripts.length}
          <SidebarFooter />
        </Sidebar>
      </Panel>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  loading: state.sidebar.loading,
  aiscripts: state.aiscripts,
});

export default connect(mapStateToProps)(ScriptsLayout);
