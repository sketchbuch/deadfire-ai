// @flow

import React, { PureComponent } from 'react';
import Panel from '../../components/Panel/Panel';
import InfoMessage from '../../components/InfoMessage/InfoMessage';
import { trans } from '../../components/Translation/Translation';
import './ErrorLayout.css';

type Props = {
  errorMsg: string
};


class ErrorLayout extends PureComponent<Props> {
  props: Props;
  
  static defaultProps = {
    errorMsg: '',
  };

  componentDidMount() {
    document.body.classList.add('has-error')
  }

  componentWillUnmount() {
    document.body.classList.remove('has-error')
  }

  render() {
    const headline = window.app.translations.length > 0 ? trans('InfoMessage', 'ErrorLayout') : 'An error occured';

    return (
      <Panel classes="ErrorLayout">
        <InfoMessage headline={headline} message={this.props.errorMsg} />
      </Panel>
    )
  }Error2
}


export default ErrorLayout;
