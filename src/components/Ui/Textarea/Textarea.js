//@flow

import * as React from 'react';
import classNames from 'classnames';
import { UI_ERROR_CLASS } from '../../../constants/ui';
import './Textarea.css';

type Props = {
  classes?: string,
  disabled?: boolean,
  isValid?: boolean,
  name?: string,
  onBlur?: Function,
  onChange?: Function,
  placeholder?: string,
  title?: string,
  value?: string,
};


/**
* Textarea tag.
*/
class Textarea extends React.PureComponent<Props> {
  static defaultProps = {
    disabled: false,
    isValid: true,
    onBlur: null,
    onChange: null,
  };

  props: Props;

  render() {
    const {
      classes,
      disabled,
      isValid,
      name,
      onBlur,
      onChange,
      placeholder,
      title,
      value,
    } = this.props;

    return (
        <textarea
          className={classNames({
            Textarea: true,
            [classes]: !!classes,
            [UI_ERROR_CLASS]: !isValid 
          })}
          disabled={disabled}
          onBlur={disabled ? null : onBlur}
          onChange={disabled ? null : onChange}
          name={name}
          placeholder={placeholder}
          title={title}
          value={value}
        />
    )
  }
}


export default Textarea;
