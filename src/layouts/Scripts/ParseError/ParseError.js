// @flow

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import EditPanel from '../../../components/EditPanel/EditPanel';
import InfoMessage from '../../../components/InfoMessage/InfoMessage';
import type { Aiscript } from '../../../types/aiscript';
import { ICON_WARNING } from '../../../constants/icons';
import { ROUTE_SCRIPTS_PARSE_ERROR } from '../../../constants/routes';
import { setTitle } from '../../../utils';
import { trans } from '../../../components/Translation/Translation';

const NS = 'ScriptsLayout';

type Props = { ...RouteComponentProps, item: Aiscript };

class ParseError extends Component<Props> {
  props: Props;

  componentDidMount() {
    setTitle(trans('WinTitle', NS));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (window.location.pathname === ROUTE_SCRIPTS_PARSE_ERROR) {
      setTitle(trans('WinTitle', NS));
    }
  }

  render() {
    const { item } = this.props;
    console.log('item', item);
    if (!item) {
      return null;
    }
    return (
      <EditPanel>
        <InfoMessage headline="Parsing error" icon={ICON_WARNING} message={item.getLabel()}>
          {item.parseErrorMsg}
        </InfoMessage>
      </EditPanel>
    );
  }
}

export default ParseError;
