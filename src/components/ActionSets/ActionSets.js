// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { ActionSet } from '../../types/byteStructure';
import type { EternityDataObj } from '../../types/eternity';
import { ActionSet as Set } from '../ActionSet/ActionSet';
import { sortObjectsAz } from '../../utils/sort';
import './ActionSets.css';

type Props = {
  actions: EternityDataObj[],
  conditions: EternityDataObj[],
  sets: ActionSet[],
};

export class ActionSets extends React.Component<Props> {
  props: Props;

  static defaultProps = {
    sets: [],
  };

  render() {
    // TODO: Use reselect here!
    const sortedConditions = sortObjectsAz(this.props.conditions, ['label']);

    return (
      <section className="ActionSets">
        {this.props.sets.map((set: ActionSet) => {
          return <Set actions={this.props.actions} conditions={sortedConditions} key={set.TypeID} set={set} />;
        })}
      </section>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  actions: state.eternityAbilities,
  conditions: state.eternityAi,
});

export default connect(mapStateToProps)(ActionSets);
