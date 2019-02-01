// @flow

import * as React from 'react';
import InfoMessage from '../InfoMessage/InfoMessage';
import { ICON_BUSY } from '../../constants/icons';
import { trans } from '../Translation/Translation';

const NS = 'ParsingMessage';

type Props = {};

export class ParsingMessage extends React.PureComponent<Props> {
  props: Props;

  render() {
    return <InfoMessage headline={trans('Headline', NS)} icon={ICON_BUSY} message={trans('Message', NS)} />;
  }
}

export default ParsingMessage;
