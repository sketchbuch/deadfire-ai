// @flow

import React, { Component } from 'react';
import * as yup from 'yup';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import * as formActions from '../../actions/formActions';
import { change } from '../../actions/languageActions';
import Form from './Form/Form';
import Panel from '../../components/Panel/Panel';
import settingsDefault from '../../types/settings';
import settingsSchema from '../../validation/schemas/settings';
import type { FormActionTypes } from '../../types/forms';
import type { FormsState } from '../../types/forms';
import type { Languages } from '../../types/lang';
import type { SettingsState } from '../../types/settings';
import { ROUTE_SETTINGS } from '../../constants/routes';
import { formsStates } from '../../types/forms';
import { setTitle } from '../../utils';
import { trans } from '../../components/Translation/Translation';
import { update } from '../../actions/settingsActions';
import './SettingsLayout.css';

type Props = {
  ...RouteComponentProps,
  changeLanguage: (language: Languages) => void,
  formState: FormsState,
  initialSettings: SettingsType,
  setFormState: (type: FormActionTypes) => void,
  submitSettings: (settings: SettingsState) => void,
};

type State = {
  errors: { [key.string]: string[] },
  settings: SettingsState,
};

export class SettingsLayout extends Component<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      errors: {},
      settings: { ...settingsDefault, ...props.initialSettings },
    };
  }

  componentDidMount() {
    setTitle(trans('WinTitle', 'SettingsLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (window.location.pathname === ROUTE_SETTINGS) {
      setTitle(trans('WinTitle', 'SettingsLayout'));
    }

    if (this.props.formState.success) {
      toastr.success(trans('SaveSucces', 'SettingsLayout', {}));
      this.props.setFormState(formsStates.RESET);
    } else if (this.props.formState.error) {
      toastr.error(this.props.formState.errorTitle, this.props.formState.errorMsg);
      this.props.setFormState(formsStates.RESET);
    }
  }

  componentWillUnmount() {
    this.props.setFormState(formsStates.RESET);
  }

  onChange = async (event: SyntheticInputEvent) => {
    const { value, name } = event.target;
    const newSettings = { ...this.state.settings };
    let newErrors = { ...this.state.errors };

    try {
      newSettings[name] = await yup.reach(settingsSchema('change'), name).validate(value);
    } catch (error) {
      newErrors[name] = error;
    }

    this.setState({ errors: newErrors, settings: newSettings });
  };

  onSubmit = async (event: SyntheticInputEvent) => {
    event.preventDefault();
    const curSettings = { ...this.state.settings };
    const oldLang = this.props.initialSettings.lang;
    const newLang = this.state.settings.lang;
    let newErrors = {};
    let hasError = false;

    try {
      await settingsSchema('submit').validate(curSettings);
    } catch (error) {
      newErrors[error.path] = [...error.errors];
      hasError = true;
    }

    if (hasError) {
      this.props.setFormState(formsStates.ERROR);
    } else {
      this.props.setFormState(formsStates.BUSY);
    }

    this.setState({ errors: newErrors }, () => {
      if (!hasError) {
        if (oldLang !== newLang) {
          this.props.changeLanguage(newLang);
        }

        this.props.submitSettings(curSettings);
      }
    });
  };

  render() {
    return (
      <Panel classes="SettingsLayout">
        <Form
          busy={this.props.formState.busy}
          disabled={this.state.errors.length > 0}
          errors={this.state.errors}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          success={this.props.formState.success}
          values={this.state.settings}
        />
      </Panel>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  formState: state.forms,
  initialSettings: state.settings,
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => {
  return {
    changeLanguage: (language: Languages) => {
      dispatch(change(language));
    },
    submitSettings: (settings: SettingsState) => {
      dispatch(update(settings));
    },
    setFormState: (type: FormActionTypes) => {
      if (type === 'error') {
        dispatch(
          formActions[type]('settings', trans('SaveError', 'SettingsLayout'), trans('SaveErrorMsg', 'SettingsLayout'))
        );
      } else {
        dispatch(formActions[type]('settings'));
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsLayout);
