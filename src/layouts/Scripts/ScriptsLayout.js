// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as aiscriptActions from '../../actions/aiscriptActions';
import * as sidebarActions from '../../actions/sidebarActions';
import Panel from '../../components/Panel/Panel';
import ParseError from './ParseError/ParseError';
import Edit from './Edit/Edit';
import getVisibleAiscripts from '../../selectors/aiscripts';
import type { Aiscript } from '../../types/aiscript';
import { DOMAIN_SCRIPTS } from '../../constants/domains';
import { PARSE_STATE_UNPARSED } from '../../constants/misc';
import { ROUTE_SCRIPTS, ROUTE_SCRIPTS_EDIT, ROUTE_SCRIPTS_PARSE_ERROR } from '../../constants/routes';
import { Sidebar, SidebarFooter, SidebarHeader, SidebarList } from '../../components/Sidebar';
import { aiScriptSort } from '../../types/aiscript';
import { setTitle } from '../../utils';
import { trans } from '../../components/Translation/Translation';
import './ScriptsLayout.css';

const NS = 'ScriptsLayout';

/**
 * Returns the correct Aiscript based on the route.
 */
export const getScript = (scriptId: string, items: Aiscript[]) => {
  return items.filter(item => item.id === scriptId)[0];
};

type Props = {
  aiscripts: Aiscript[],
  loadSidebar: () => void,
  setFullParsing: (aiScripts: string[]) => void,
  setQuickParsing: (aiScripts: string[]) => void,
};

class ScriptsLayout extends Component<Props> {
  props: Props;

  componentDidMount() {
    setTitle(trans('WinTitle', NS));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (window.location.pathname === ROUTE_SCRIPTS) {
      setTitle(trans('WinTitle', NS));
    }

    if (this.props.aiscripts.length > 0) {
      const itemsToParse = [];
      this.props.aiscripts.forEach(item => {
        if (item.parseState === PARSE_STATE_UNPARSED && !item.parsing) {
          itemsToParse.push(item);
        }
      });

      if (itemsToParse.length > 0) {
        this.props.setQuickParsing(itemsToParse);
      }
    }
  }

  render() {
    const { aiscripts, loadSidebar } = this.props;

    return (
      <Panel classes="ScriptsLayout">
        <Sidebar loadSidebar={loadSidebar} domaiInfoMessagen={DOMAIN_SCRIPTS} loading={aiscripts.length < 1}>
          <SidebarHeader title={trans('SidebarHeader', NS)} />
          <SidebarList items={aiscripts} listType={DOMAIN_SCRIPTS} sortOrder={aiScriptSort} />
          <SidebarFooter />
        </Sidebar>
        {aiscripts.length > 0 && (
          <Switch>
            <Route
              path={ROUTE_SCRIPTS_PARSE_ERROR}
              render={routerProps => {
                const aiScript = getScript(routerProps.match.params.scriptId, aiscripts);
                return <ParseError fullParseScript={this.props.setFullParsing} item={aiScript} />;
              }}
            />
            <Route
              path={ROUTE_SCRIPTS_EDIT}
              render={routerProps => {
                const aiScript = getScript(routerProps.match.params.scriptId, aiscripts);
                return <Edit fullParseScript={this.props.setFullParsing} item={aiScript} />;
              }}
            />
          </Switch>
        )}
      </Panel>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  aiscripts: getVisibleAiscripts(state),
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => {
  return {
    loadSidebar: () => {
      dispatch(sidebarActions.loading(DOMAIN_SCRIPTS));
    },
    setFullParsing: (aiScript: Aiscript) => {
      dispatch(aiscriptActions.setFullParsing(aiScript));
    },
    setQuickParsing: (aiScripts: string[]) => {
      dispatch(aiscriptActions.setQuickParsing(aiScripts));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptsLayout);
