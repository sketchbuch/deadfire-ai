// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Panel from '../../components/Panel/Panel';
import installPathSchema from '../../validation/schemas/installPath';
import Translation, { trans } from '../../components/Translation/Translation';
import type { DispatchType } from '../../types/functions';
import {
  Button,
  FieldError,
  FieldWrap,
  Form,
  FormDescription,
  FormHeader,
  TextInput,
} from '../../components/Ui';

type Props = {
  submitPath: (installPath: string) => void,
};

type State = {
  errors: string[],
  installPath: string,
  touched: boolean,
};


export class NewLayout extends Component<Props, State> {
  props: Props;
  state: State = {
    errors: [],
    installPath: '',
    touched: false,
  };

  onChange = (event: SyntheticInputEvent) => {
    this.update(event.target.value);
  }

  onSubmit = async (event: SyntheticInputEvent) => {
    event.preventDefault();
    const hadErrors = await this.update(this.state.installPath);
    
    if (!hadErrors) {
      this.props.dispatch({ type: 'TEST', payload: { installPath: this.state.installPath }});
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
    const isError = this.state.errors.length > 0;

    return (
      <Panel>
        <Form onSubmit={this.onSubmit}>
          <FormHeader text={trans('Headline', 'NewLayout')} />
          <FormDescription text={trans('Description', 'NewLayout')} />

          <FieldWrap>
            <TextInput 
              name="installPath"
              onChange={this.onChange}
              placeholder={trans('Placeholder', 'NewLayout')}
              value={this.state.installPath}
              isValid={!isError}
            />
            {isError && <FieldError errors={this.state.errors} />}
          </FieldWrap>

          <Button type="submit" disabled={isError || !this.state.touched} busy={false}>
            <Translation name="Button" ns="NewLayout" />
          </Button>
        </Form>
      </Panel>
    )
  }
}

const mapStateToProps = (state: Object) => (
  {
  }
);

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    submitPath: (installPath: string) => {
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewLayout);
