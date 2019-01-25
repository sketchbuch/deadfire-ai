// @flow

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import EditPanel from '../../../components/EditPanel/EditPanel';
import InfoMessage from '../../../components/InfoMessage/InfoMessage';
import { ICON_WARNING } from '../../../constants/icons';
import { ROUTE_SCRIPTS_PARSE_ERROR } from '../../../constants/routes';
import { setTitle } from '../../../utils';
import { trans } from '../../../components/Translation/Translation';

const NS = 'ScriptsLayout';

type Props = { ...RouteComponentProps };

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
    console.log(this.props);
    return (
      <EditPanel>
        <InfoMessage headline="Parse Error" icon={ICON_WARNING} message="Some error message" />
      </EditPanel>
    );
  }
}

export default ParseError;
