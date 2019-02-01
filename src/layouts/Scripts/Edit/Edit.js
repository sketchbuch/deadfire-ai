// @flow

import React, { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import EditPanel from '../../../components/EditPanel/EditPanel';
import ParsingMessage from '../../../components/ParsingMessage/ParsingMessage';
import type { Aiscript } from '../../../types/aiscript';
import { PARSE_STATE_ERROR, PARSE_STATE_QUICK } from '../../../constants/misc';
import { ROUTE_SCRIPTS_EDIT } from '../../../constants/routes';
import { setTitle } from '../../../utils';
import { trans } from '../../../components/Translation/Translation';

const NS = 'Edit';

type Props = { ...RouteComponentProps, fullParseScript: (aiScript: Aiscript) => void, item: Aiscript };

class Edit extends Component<Props> {
  props: Props;

  componentDidMount() {
    setTitle(trans('WinTitle', NS));
    this.loadScript();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (window.location.pathname === ROUTE_SCRIPTS_EDIT) {
      setTitle(trans('WinTitle', NS));
    }
    this.loadScript();
  }

  loadScript() {
    const { fullParseScript, item } = this.props;
    if (item.parseState === PARSE_STATE_QUICK && !item.parsing) {
      fullParseScript([item]);
    }
  }

  render() {
    if (this.props.item.parseState === PARSE_STATE_ERROR) {
      return <Redirect to={this.props.item.getUrl()} />;
    }

    return <EditPanel>{this.props.item.parsing ? <ParsingMessage /> : 'edit'}</EditPanel>;
  }
}

export default Edit;
