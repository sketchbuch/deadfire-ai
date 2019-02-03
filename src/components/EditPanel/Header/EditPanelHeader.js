// @flow

import * as React from 'react';
import './EditPanelHeader.css';

type Props = {
  children?: React.Node,
  title: string,
};

/**
 * Edit Panel header.
 */
export class EditPanelHeader extends React.Component<Props> {
  static defaultProps = {
    children: null,
    title: '',
  };

  props: Props;

  render() {
    return (
      <header className="EditPanelHeader">
        {this.props.children ? this.props.children : <h1 className="EditPanelHeader__headline">{this.props.title}</h1>}
      </header>
    );
  }
}

export default EditPanelHeader;
