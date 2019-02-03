// @flow

import * as React from 'react';
import type { ActionSet as Set } from '../../types/byteStructure';
import './ActionSet.css';

type Props = {
  set: Set,
};

export class ActionSet extends React.Component<Props> {
  props: Props;

  render() {
    const { ActionLen, AllowedMovement, ConditionsLen, Cooldown, Name } = this.props.set;

    return (
      <section className="ActionSet">
        <header className="ActionSet__header">
          <h1 className="ActionSet__headline">{Name}</h1>
        </header>
        <div className="ActionSet__body">
          <p>Cooldown {Cooldown}</p>
          <p>AllowedMovement {AllowedMovement}</p>
          <p>ConditionsLen {ConditionsLen}</p>
          <p>ActionLen {ActionLen}</p>
        </div>
      </section>
    );
  }
}

export default ActionSet;
