// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as aiscriptActions from '../../actions/aiscriptActions';
import * as sidebarActions from '../../actions/sidebarActions';
import Edit from './Edit/Edit';
import Icon from '../../components/Icon/Icon';
import Panel from '../../components/Panel/Panel';
import ParseError from './ParseError/ParseError';
import type { Aiscript } from '../../types/aiscript';
import { DOMAIN_SCRIPTS } from '../../constants/domains';
import { ICON_SEARCH } from '../../constants/icons';
import { PARSE_STATE_UNPARSED } from '../../constants/misc';
import { ROUTE_SCRIPTS, ROUTE_SCRIPTS_EDIT, ROUTE_SCRIPTS_PARSE_ERROR } from '../../constants/routes';
import { SearchField } from '../../components/Ui';
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

type State = {
  searching: boolean,
  term: string,
};

class ScriptsLayout extends Component<Props, State> {
  props: Props;
  state: State = {
    searching: false,
    term: '',
  };
  itemsToParse: Aiscript[] = [];

  componentDidMount() {
    setTitle(trans('WinTitle', NS));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (window.location.pathname === ROUTE_SCRIPTS) {
      setTitle(trans('WinTitle', NS));
    }

    if (this.props.aiscripts.length > 0) {
      if (this.itemsToParse.length > 0) {
        this.props.setQuickParsing(this.itemsToParse);
      }
    }
  }

  handleSearchIconClick = (event: SyntheticMouseEvent<HTMLSpanElement>) => {
    this.setState({ searching: !this.state.searching });
  };

  handleSearchChange = (event: SyntheticMouseEvent<HTMLSpanElement>) => {
    this.setState({ term: event.currentTarget.value });
  };

  getListItems(aiscripts: Aiscript[]) {
    const items = getVisibleAiscripts(aiscripts, { term: this.state.term });
    this.itemsToParse = [];
    items.forEach(item => {
      if (item.parseState === PARSE_STATE_UNPARSED && !item.parsing) {
        this.itemsToParse.push(item);
      }
    });

    return items;
  }

  render() {
    const { aiscripts, loadSidebar } = this.props;
    const items = this.getListItems(aiscripts);

    return (
      <Panel classes="ScriptsLayout">
        <Sidebar loadSidebar={loadSidebar} domaiInfoMessagen={DOMAIN_SCRIPTS} loading={aiscripts.length < 1}>
          <SidebarHeader title={trans('SidebarHeader', NS)} showHeadline={!this.state.searching}>
            {this.state.searching ? (
              <SearchField
                onChange={this.handleSearchChange}
                placeholder={trans('SearchPlaceholder', NS)}
                sidebar
                term={this.state.term}
              />
            ) : (
              <span onClick={this.handleSearchIconClick}>
                <Icon type={ICON_SEARCH} />
              </span>
            )}
          </SidebarHeader>
          <SidebarList items={items} listType={DOMAIN_SCRIPTS} sortOrder={aiScriptSort} />
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

const getVisibleAiscripts = createSelector(
  [aiscripts => aiscripts, (aiscripts, props) => props.term],
  (aiscripts, term) => {
    let items = [...aiscripts];
    if (term !== '') {
      items = items.filter(i => i.contains(term, true));
    }

    if (items.length > 0) {
      return items.slice(0, 10);
    }

    return [];
  }
);

const mapStateToProps = (state: Object) => ({
  aiscripts: state.aiscripts,
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
