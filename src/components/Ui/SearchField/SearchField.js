//@flow

import * as React from 'react';
import classNames from 'classnames';
import TextInput from '../TextInput/TextInput';
import './SearchField.css';

type Props = {
  classes: string,
  onChange: (event: SyntheticMouseEvent<HTMLSpanElement>) => void,
  placeholder: string,
  sidebar: boolean,
  term: string,
};

/**
 * A SearchField component.
 */
class SearchField extends React.PureComponent<Props> {
  props: Props;

  render() {
    const { onChange, placeholder, term } = this.props;

    return (
      <div
        className={classNames('SearchField', {
          SearchField__sidebar: this.props.sidebar,
          [this.props.classes]: !!this.props.classes,
        })}
      >
        <TextInput onChange={onChange} placeholder={placeholder} value={term} />
      </div>
    );
  }
}

export default SearchField;
