// @flow

import React, { Component } from 'react';
import Translation, { trans } from '../../../components/Translation/Translation';
import {
  Button,
  Field,
  FieldError,
  FieldWrap,
  Form as FormElement,
  FormHeader,
  Label,
  Select,
  TextInput,
} from '../../../components/Ui';
import { langs } from '../../../reducers/languages';
import type { SettingsState } from '../../types/settings';

type Props = {
  busy: boolean,
  disabled: boolean,
  errors: string[],
  onChange: (event: SyntheticInputEvent) => void,
  onSubmit: (event: SyntheticInputEvent) => void,
  success: boolean,
  values: SettingsState,
};

export class Form extends Component<Props> {
  props: Props;

  render() {
    const { busy, disabled, errors, onChange, onSubmit, values } = this.props;

    return (
      <FormElement onSubmit={onSubmit}>
        <FormHeader text={trans('Headline', 'SettingsLayout')} />

        <fieldset>
          <legend>
            <Translation name="LegendMisc" ns="SettingsLayout" />
          </legend>

          <FieldWrap>
            <Label htmlFor="lang">
              <Translation name="LabelLanguage" ns="SettingsLayout" />
            </Label>
            <Field>
              <Select id="lang" name="lang" onChange={onChange} options={langs} value={values.lang} />
            </Field>
          </FieldWrap>
        </fieldset>

        <fieldset>
          <legend>
            <Translation name="LegendDeadfire" ns="SettingsLayout" />
          </legend>

          <FieldWrap>
            <Label htmlFor="installPath">
              <Translation name="LabelInstallPath" ns="SettingsLayout" />
            </Label>
            <Field>
              <TextInput
                id="installPath"
                isValid={!errors.installPath}
                name="installPath"
                onChange={onChange}
                placeholder={trans('Placeholder', 'NewLayout')}
                value={values.installPath}
              />
              <FieldError errors={errors.installPath} />
            </Field>
          </FieldWrap>
        </fieldset>

        <FieldWrap classes="FieldWrap--buttons">
          <Button type="submit" disabled={disabled} busy={busy}>
            <Translation name="Button" ns="SettingsLayout" />
          </Button>
        </FieldWrap>
      </FormElement>
    );
  }
}

export default Form;
