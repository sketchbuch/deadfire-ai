//@flow

import * as React from 'react';
import classNames from 'classnames';
import { UI_ERROR_CLASS } from '../../../constants/ui';
import type { EventHandler } from '../../../types/functions';
import './Select.css';

type Props = {
  classes?: string,
  disabled?: boolean,
  id?: string,
  isValid?: boolean,
  name?: string,
  onChange?: EventHandler | null,
  options: {
    [key: string]: string,
  },
  title?: string,
  value?: string,
};

/**
 * Generic select tag.
 */
class Select extends React.PureComponent<Props> {
  static defaultProps = {
    disabled: false,
    isValid: true,
    onChange: null,
    options: {},
  };

  props: Props;

  render() {
    const { classes, disabled, id, isValid, name, onChange, options, title, value } = this.props;

    return (
      <select
        className={classNames('Select', {
          [classes]: !!classes,
          [UI_ERROR_CLASS]: !isValid,
        })}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        title={title}
        value={value}
      >
        {Object.keys(options).map((opt: string) => {
          return (
            <option value={opt} key={opt}>
              {options[opt]}
            </option>
          );
        })}
      </select>
    );
  }
}

export default Select;
