//@flow

import * as React from 'react';
import classNames from 'classnames';
import { UI_ERROR_CLASS } from '../../../constants/ui';
import './Textarea.css';

type Props = {
  className?: string,
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
    className: '',
    disabled: false,
    isValid: true,
    name: '',
    onBlur: null,
    onChange: null,
    placeholder: '',
    title: '',
    value: '',
  };

  props: Props;

  render() {
    return (
        <textarea
          className={classNames({
            Textarea: true,
            [this.props.classes]: !!this.props.classes,
            [UI_ERROR_CLASS]: !this.props.isValid 
          })}
          disabled={this.props.disabled}
          onBlur={this.props.disabled ? null : this.props.onBlur}
          onChange={this.props.disabled ? null : this.props.onChange}
          name={this.props.name}
          placeholder={this.props.placeholder}
          title={this.props.title}
          value={this.props.value}
        />
    )
  }
}


export default Textarea;
