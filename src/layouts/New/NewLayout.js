// @flow

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import Form from './Form/Form';
import Panel from '../../components/Panel/Panel';
import installPathSchema from '../../validation/schemas/installPath';
import type { Dispatch as ReduxDispatch } from 'redux';
import type { SettingsState } from '../../types/settings';
import { update } from '../../actions/settingsActions';

type Props = {
  ...RouteComponentProps,
  installPathSet: boolean,
  submitPath: (installPath: string) => void,
};

type State = {
  busy: boolean,
  errors: string[],
  installPath: string,
  touched: boolean,
};

export class NewLayout extends Component<Props, State> {
  props: Props;
  state: State = {
    busy: false,
    errors: [],
    installPath: '',
    touched: false,
  };

  onChange = (event: SyntheticInputEvent) => {
    this.update(event.target.value);
  };

  onSubmit = async (event: SyntheticInputEvent) => {
    event.preventDefault();

    const installPath = this.state.installPath;
    const hadErrors = await this.update(installPath);

    if (!hadErrors) {
      this.setState({ busy: true }, () => this.props.submitPath({ installPath }));
    }
  };

  update = async (installPath: string): boolean => {
    let hadErrors = false;
    const newState = {
      errors: [],
      installPath,
      touched: installPath !== '',
    };

    try {
      await installPathSchema.validate(installPath);
    } catch (e) {
      newState.errors = [...e.errors];
      hadErrors = true;
    }

    this.setState(newState);
    return hadErrors;
  };

  render() {
    return (
      <Panel classes="NewLayout">
        <Form
          busy={this.state.busy}
          disabled={this.state.errors.length > 0 || !this.state.touched}
          errors={this.state.errors}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          value={this.state.installPath}
        />
      </Panel>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  installPathSet: state.app.installPathSet,
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => {
  return {
    submitPath: (settings: SettingsState) => {
      dispatch(update(settings));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewLayout);
