// @flow

import * as React from 'react';
import Select from 'react-select';
import type { ActionSet as Set } from '../../types/byteStructure';
import type { EternityDataObj } from '../../types/eternity';
import './ActionSet.css';

type Props = {
  actions: EternityDataObj[],
  conditions: EternityDataObj[],
  set: Set,
};

export class ActionSet extends React.Component<Props> {
  props: Props;

  render() {
    const { Actions, ActionLen, AllowedMovement, Conditions, ConditionsLen, Cooldown, Name } = this.props.set;
    const options = this.props.conditions.map(cond => {
      return {
        value: cond.id,
        label: cond.label,
      };
    });

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

          <div className="ActionSet__conditions">
            {Conditions.map(setCond => {
              return (
                <div className="ActionSet__condition" key={setCond.TypeID}>
                  <Select
                    onChange={() => {}}
                    value={options.find(opt => {
                      return opt.value === setCond.ConditionalSet;
                    })}
                    options={options}
                  />
                  <label>
                    <input onChange={() => {}} type="checkbox" checked={setCond.Not} />
                    Not
                  </label>
                </div>
              );
            })}
          </div>

          <div className="ActionSet__actions">
            {Actions.map(setAction => {
              const abilityData = this.props.actions.find(act => act.id === setAction.Ability);
              return (
                <div className="ActionSet__action" key={setAction.TypeID}>
                  <p>{abilityData.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default ActionSet;
