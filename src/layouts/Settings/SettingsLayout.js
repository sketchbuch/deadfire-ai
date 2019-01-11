// @flow

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import Form from './Form/Form';
import Panel from '../../components/Panel/Panel';
import settingsDefault from '../../types/settings';
import type { SettingsState } from '../../types/settings';
import { ROUTE_SETTINGS } from '../../constants/routes';
import { setTitle } from '../../utils';
import { trans } from '../../components/Translation/Translation';
import './SettingsLayout.css';

type Props = {
  ...RouteComponentProps,
  settings: SettingsType,
};

type State = {
  busy: boolean,
  errors: string[],
  settings: SettingsState,
};

class SettingsLayout extends Component<Props, State> {
  props: Props;
  state: State = {
    busy: false,
    errors: [],
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

  onChange = (event: SyntheticInputEvent) => {
    console.log('onChange()');
    //this.update(event.target.value);
  };

  onSubmit = async (event: SyntheticInputEvent) => {
    event.preventDefault();

    console.log('onSubmit()');
  };

  render() {
    return (
      <Panel classes="SettingsLayout">
        <Form
          busy={this.state.busy}
          disabled={this.state.errors.length > 0}
          errors={this.state.errors}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          values={this.props.settings}
        />
      </Panel>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  settings: state.settings,
  languages: state.languages.available,
});

export default connect(mapStateToProps)(SettingsLayout);
