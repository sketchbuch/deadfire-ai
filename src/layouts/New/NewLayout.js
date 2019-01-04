// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Panel from '../../components/Panel/Panel';
import Form from './Form/Form';
import installPathSchema from '../../validation/schemas/installPath';
import { update } from '../../actions/settingsActions';
import { ROUTE_HOME } from '../../constants/routes';
import type { DispatchType } from '../../types/functions';
import type { SettingsUpdate } from '../../types/settings';

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

  componentDidUpdate() {
    /* if (this.state.busy && this.props.installPathSet) {
      console.log('changing');
      this.props.history.push(ROUTE_HOME);
    } */
  }

  onChange = (event: SyntheticInputEvent) => {
    this.update(event.target.value);
  }

  onSubmit = async (event: SyntheticInputEvent) => {
    event.preventDefault();
    
    const installPath = this.state.installPath;
    const hadErrors = await this.update(installPath);

    if (!hadErrors) {
      this.setState(
        { busy: true },
        () => this.props.submitPath({ installPath })
      );
    }
  }

  update = async (installPath: string): boolean => {
    let hadErrors = false;
    const newState = {
      errors: [],
      installPath,
      touched: installPath !== '',
    };

    try {
      await installPathSchema.validate(installPath);
    } catch(e) {
      newState.errors = [...e.errors];
      hadErrors = true;
    }

    this.setState(newState);
    return hadErrors;
  }

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
    )
  }
}

const mapStateToProps = (state: Object) => ({
  installPathSet: state.app.installPathSet,
});

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    submitPath: (settings: SettingsUpdate) => {
      dispatch(update(settings));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewLayout);
