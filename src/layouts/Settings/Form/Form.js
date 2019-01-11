// @flow

import React, { PureComponent } from 'react';
import Translation, { trans } from '../../../components/Translation/Translation';
import { Button, FieldWrap, Form as FormElement, FormHeader, Select, TextInput } from '../../../components/Ui';
import { langs } from '../../../reducers/languages';
import type { SettingsState } from '../../types/settings';

type Props = {
  busy: boolean,
  disabled: boolean,
  errors: string[],
  onChange: (event: SyntheticInputEvent) => void,
  onSubmit: (event: SyntheticInputEvent) => void,
  values: SettingsState,
};

export class Form extends PureComponent<Props> {
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
            <label className="Fieldwrap__left" htmlFor="language">
              <Translation name="LabelLanguage" ns="SettingsLayout" />
            </label>
            <div className="Fieldwrap__right">
              <Select id="langauge" name="language" onChange={onChange} options={langs} value={values.language} />
            </div>
          </FieldWrap>
        </fieldset>

        <fieldset>
          <legend>
            <Translation name="LegendDeadfire" ns="SettingsLayout" />
          </legend>

          <FieldWrap>
            <label className="Fieldwrap__left" htmlFor="language">
              <Translation name="LabelInstallPath" ns="SettingsLayout" />
            </label>
            <div className="Fieldwrap__right">
              <TextInput
                name="installPath"
                onChange={onChange}
                placeholder={trans('Placeholder', 'NewLayout')}
                value={values.installPath}
              />
            </div>
          </FieldWrap>
        </fieldset>

        <Button type="submit" disabled={disabled} busy={busy}>
          <Translation name="Button" ns="SettingsLayout" />
        </Button>
      </FormElement>
    );
  }
}

export default Form;
