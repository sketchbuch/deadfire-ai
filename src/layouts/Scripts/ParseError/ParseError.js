// @flow

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import EditPanel from '../../../components/EditPanel/EditPanel';
import InfoMessage from '../../../components/InfoMessage/InfoMessage';
import ParsingMessage from '../../../components/ParsingMessage/ParsingMessage';
import type { Aiscript } from '../../../types/aiscript';
import { Button } from '../../../components/Ui';
import { ICON_WARNING } from '../../../constants/icons';
import { ROUTE_SCRIPTS_PARSE_ERROR } from '../../../constants/routes';
import { setTitle } from '../../../utils';
import Translation, { trans } from '../../../components/Translation/Translation';
import './ParseError.css';

const NS = 'ParseError';

type Props = { ...RouteComponentProps, fullParseScript: (aiScript: Aiscript) => void, item: Aiscript };

class ParseError extends Component<Props> {
  props: Props;

  componentDidMount() {
    setTitle(trans('WinTitle', NS));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (window.location.pathname === ROUTE_SCRIPTS_PARSE_ERROR) {
      setTitle(trans('WinTitle', NS));
    }
  }

  handleClick = () => this.props.fullParseScript([this.props.item]);

  render() {
    const { item } = this.props;

    return (
      <EditPanel>
        {this.props.item.parsing ? (
          <ParsingMessage />
        ) : (
          <InfoMessage headline={trans('Headline', NS)} icon={ICON_WARNING} message={item.parseErrorMsg}>
            <p className="ParseError__name">{item.getLabel()}</p>
            <p className="ParseError__stack">{item.parseErrorStack}</p>
            <p className="ParseError__retry">
              <Button inline onClick={this.handleClick} busy={this.props.item.parsing}>
                <Translation name="RetryBtn" ns={NS} />
              </Button>
            </p>
          </InfoMessage>
        )}
      </EditPanel>
    );
  }
}

export default ParseError;
