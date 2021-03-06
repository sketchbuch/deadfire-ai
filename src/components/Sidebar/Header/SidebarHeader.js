// @flow

import * as React from 'react';
import './SidebarHeader.css';

type Props = {
  children?: React.Node,
  showHeadline: boolean,
  subtitle: string,
  title: string,
};

/**
 * Sidebar header.
 */
class SidebarHeader extends React.PureComponent<Props> {
  static defaultProps = {
    children: null,
    showHeadline: true,
    subtitle: '',
    title: '',
  };

  props: Props;

  render() {
    return (
      <header className="SidebarHeader" data-headline={this.props.showHeadline}>
        {this.props.showHeadline && (
          <h1 className="SidebarHeader__headline">
            {this.props.title}
            {this.props.subtitle && <span className="SidebarHeader__subheadline">{this.props.subtitle}</span>}
          </h1>
        )}
        {this.props.children && <div className="SidebarHeader__controls">{this.props.children}</div>}
      </header>
    );
  }
}

export default SidebarHeader;
