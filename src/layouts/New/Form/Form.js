// @flow

import React, { PureComponent } from 'react';
import Translation, { trans } from '../../../components/Translation/Translation';
import {
  Button,
  FieldError,
  FieldWrap,
  Form as FormElement,
  FormDescription,
  FormHeader,
  TextInput,
} from '../../../components/Ui';

type Props = {
  busy: boolean,
  disabled: boolean,
  errors: string[],
  onChange: (event: SyntheticInputEvent) => void,
  onSubmit: (event: SyntheticInputEvent) => void,
  value: string,
};


export class Form extends PureComponent<Props> {
  props: Props;

  render() {
    const {
      busy,
      disabled,
      errors,
      onChange,
      onSubmit,
      value,
    } = this.props;

    return (
      <FormElement onSubmit={onSubmit}>
        <FormHeader text={trans('Headline', 'NewLayout')} />
        <FormDescription text={trans('Description', 'NewLayout')} />

        <FieldWrap>
          <TextInput 
            name="installPath"
            onChange={onChange}
            placeholder={trans('Placeholder', 'NewLayout')}
            value={value}
            isValid={errors.length < 1}
          />
          {errors.length > 0 && <FieldError errors={errors} />}
        </FieldWrap>

        <Button type="submit" disabled={disabled} busy={busy}>
          <Translation name="Button" ns="NewLayout" />
        </Button>
      </FormElement>
    )
  }
}


export default Form;
