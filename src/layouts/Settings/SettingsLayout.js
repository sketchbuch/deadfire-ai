// @flow

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import Panel from '../../components/Panel/Panel';
import settingsDefault from '../../types/settings';
import { ROUTE_SETTINGS } from '../../constants/routes';
import { setTitle } from '../../utils';
import { trans } from '../../components/Translation/Translation';
import './SettingsLayout.css';

type Props = {
  ...RouteComponentProps,
  settings: SettingsType,
};

type State = {
  error: boolean,
  saving: boolean,
  settings: Object,
};

class SettingsLayout extends Component<Props, State> {
  props: Props;

  state: State = {
    error: false,
    saving: false,
    settings: { ...settingsDefault },
  };

  componentDidMount() {
    setTitle(trans('WinTitle', 'Settings'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (window.location.pathname === ROUTE_SETTINGS) {
      setTitle(trans('WinTitle', 'Settings'));
    }
  }

  render() {
    return <Panel classes="SettingsLayout">SettingsLayout</Panel>;
  }
}

const mapStateToProps = (state: Object) => ({
  settings: state.settings,
  languages: state.languages.available,
});

export default connect(mapStateToProps)(SettingsLayout);
