// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import * as aiscriptActions from '../../actions/aiscriptActions';
import * as sidebarActions from '../../actions/sidebarActions';
import EditPanel from '../../components/EditPanel/EditPanel';
import Panel from '../../components/Panel/Panel';
import ParseError from './ParseError/ParseError';
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

if (window.quickParse === undefined) {
  window.quickParse = {};
}

type Props = {
  aiscripts: Aiscript[],
  loadSidebar: () => void,
  quickParseScript: (aiScript: Aiscript) => void,
};

/**
 * A HoC to add the router props and the selected script to the wrapped component.
 */
export function withAiscript(
  WrappedComponent: React.ComponentType<any>,
  routerProps: RouteComponentProps,
  items: Aiscript[]
) {
  const scriptItem = items.filter(item => item.id === routerProps.match.params.scriptId);
  console.log('routerProps.match.params.scriptId', routerProps.match.params.scriptId);
  return () => <WrappedComponent {...routerProps} item={scriptItem[0]} />;
}

class ScriptsLayout extends Component<Props> {
  props: Props;

  componentDidMount() {
    setTitle(trans('WinTitle', NS));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (window.location.pathname === ROUTE_SCRIPTS) {
      setTitle(trans('WinTitle', NS));
    }
  }

  getItems() {
    let items = this.props.aiscripts;

    if (items.length > 0) {
      items = items.slice(0, 10);
      items.forEach(item => {
        if (item.parseState === PARSE_STATE_UNPARSED && window.quickParse[item.id] === undefined) {
          window.quickParse[item.id] = true;
          this.props.quickParseScript(item);
        }
      });
    }

    return items;
  }

  render() {
    const { aiscripts, loadSidebar } = this.props;
    const items = this.getItems();

    return (
      <Panel classes="ScriptsLayout">
        <Sidebar loadSidebar={loadSidebar} domaiInfoMessagen={DOMAIN_SCRIPTS} loading={aiscripts.length < 1}>
          <SidebarHeader title={trans('SidebarHeader', NS)} />
          <SidebarList items={items} listType={DOMAIN_SCRIPTS} sortOrder={aiScriptSort} />
          <SidebarFooter />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_SCRIPTS_PARSE_ERROR}
            render={routerProps => {
              const ScriptedParseError = withAiscript(ParseError, routerProps, items);
              return <ScriptedParseError />;
            }}
          />
          <Route path={ROUTE_SCRIPTS_EDIT}>
            <EditPanel>Edit</EditPanel>
          </Route>
        </Switch>
      </Panel>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  aiscripts: state.aiscripts,
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => {
  return {
    loadSidebar: () => {
      dispatch(sidebarActions.loading(DOMAIN_SCRIPTS));
    },
    quickParseScript: (aiScript: Aiscript) => {
      dispatch(aiscriptActions.quickParse(aiScript));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptsLayout);
