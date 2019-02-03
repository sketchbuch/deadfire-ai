// @flow

import * as React from 'react';
import type { ActionSet } from '../../types/byteStructure';
import { ActionSet as Set } from '../ActionSet/ActionSet';
import './ActionSets.css';

type Props = {
  sets: ActionSet[],
};

export class ActionSets extends React.Component<Props> {
  props: Props;

  static defaultProps = {
    sets: [],
  };

  render() {
    return (
      <section className="ActionSets">
        {this.props.sets.map((set: ActionSet) => {
          return <Set key={set.TypeID} set={set} />;
        })}
      </section>
    );
  }
}

export default ActionSets;
