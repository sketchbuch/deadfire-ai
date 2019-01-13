//@flow

import * as React from 'react';
import classNames from 'classnames';
import { UI_ERROR_CLASS } from '../../../constants/ui';
import type { EventHandler } from '../../../types/functions';
import './TextInput.css';

type Props = {
  classes?: string,
  defaultValue?: string,
  disabled?: boolean,
  id?: string,
  isValid?: boolean,
  maxLength?: number,
  name?: string,
  onBlur?: EventHandler | null,
  onChange?: EventHandler | null,
  onKeyUp?: EventHandler | null,
  placeholder?: string,
  title?: string,
  type?: string,
  value?: string,
  webkitdirectory?: boolean,
};

/**
 * Generic input tag.
 */
class TextInput extends React.PureComponent<Props> {
  static defaultProps = {
    disabled: false,
    isValid: true,
    onBlur: null,
    onChange: null,
    onKeyUp: null,
    type: 'text',
  };

  props: Props;

  render() {
    const {
      classes,
      defaultValue,
      disabled,
      id,
      isValid,
      maxLength,
      name,
      onBlur,
      onChange,
      onKeyUp,
      placeholder,
      title,
      type,
      value,
    } = this.props;

    return (
      <input
        className={classNames({
          TextInput: true,
          [classes]: !!classes,
          [UI_ERROR_CLASS]: !isValid,
        })}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        title={title}
        type={type}
        value={value}
      />
    );
  }
}

export default TextInput;
