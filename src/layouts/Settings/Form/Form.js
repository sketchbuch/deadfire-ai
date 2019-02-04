// @flow

import React, { Component } from 'react';
import Select from 'react-select';
import Translation, { trans } from '../../../components/Translation/Translation';
import {
  Button,
  Field,
  FieldError,
  FieldWrap,
  Form as FormElement,
  FormHeader,
  Label,
  TextInput,
} from '../../../components/Ui';
import type { LangOption } from '../../types/lang';
import type { SettingsState } from '../../types/settings';
import { langs } from '../../../reducers/languages';

const langOptions: LangOption[] = [];

Object.keys(langs).forEach(function(key, index) {
  langOptions.push({
    value: key,
    label: langs[key],
  });
});

type Props = {
  busy: boolean,
  disabled: boolean,
  errors: string[],
  onChange: (event: SyntheticInputEvent) => void,
  onSelectChange: (selOption: LangOption) => void,
  onSubmit: (event: SyntheticInputEvent) => void,
  success: boolean,
  values: SettingsState,
};

export class Form extends Component<Props> {
  props: Props;

  render() {
    const { busy, disabled, errors, onChange, onSelectChange, onSubmit, values } = this.props;

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
              <Select
                className="AppSelect"
                classNamePrefix="AppSelect__"
                id="lang"
                name="lang"
                onChange={onSelectChange}
                options={langOptions}
                value={langOptions.find(opt => {
                  return opt.value === values.lang;
                })}
              />
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
                placeholder={trans('PlaceholderInstallPath', 'SettingsLayout')}
                value={values.installPath}
              />
              <FieldError errors={errors.installPath} />
            </Field>
          </FieldWrap>

          <FieldWrap>
            <Label htmlFor="aiPath">
              <Translation name="LabelAiPath" ns="SettingsLayout" />
            </Label>
            <Field>
              <TextInput
                id="aiPath"
                isValid={!errors.aiPath}
                name="aiPath"
                onChange={onChange}
                placeholder={trans('PlaceholderAiPath', 'SettingsLayout')}
                value={values.aiPath}
              />
              <FieldError errors={errors.aiPath} />
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
