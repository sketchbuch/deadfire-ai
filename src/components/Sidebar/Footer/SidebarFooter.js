// @flow

import * as React from 'react';
import './SidebarFooter.css';

type Props = {
  leftActions?: React.Node,
  rightActions?: React.Node,
};

/**
 * Sidebar footer controls.
 */
class SidebarFooter extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <footer className="SidebarFooter">
        <div className="SidebarFooter__actionsBox">footer</div>
      </footer>
    );
  }
}

export default SidebarFooter;
