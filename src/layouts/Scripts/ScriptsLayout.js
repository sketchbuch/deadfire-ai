// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Panel from '../../components/Panel/Panel';
import type { Aiscript } from '../../types/aiscript';
import { DOMAIN_SCRIPTS } from '../../constants/domains';
import { Sidebar, SidebarFooter, SidebarHeader, SidebarList } from '../../components/Sidebar';
import { aiScriptSort } from '../../types/aiscript';
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
    console.log(aiscripts, loading);

    return (
      <Panel classes="ScriptsLayout">
        <Sidebar dispatch={dispatch} domain={DOMAIN_SCRIPTS} itemCount={aiscripts.length} loading={loading}>
          <SidebarHeader title="Sidebar" />
          <SidebarList items={aiscripts} listType={DOMAIN_SCRIPTS} sortOrder={aiScriptSort} />
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
