// @flow

import * as React from 'react';
import classNames from 'classnames';
import './EditPanel.css';

type Props = {
  children?: React.Node,
  classes?: string,
};

export class EditPanel extends React.Component<Props> {
  props: Props;

  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <section
        className={classNames('EditPanel', {
          [this.props.classes]: !!this.props.classes,
        })}
      >
        {this.props.children}
      </section>
    );
  }
}

export default EditPanel;
