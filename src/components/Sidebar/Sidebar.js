// @flow

import * as React from 'react';
import classNames from 'classnames';
import './Sidebar.css';

type Props = {
  children?: React.Node,
  footer: boolean,
  header: boolean,
  loadSidebar: () => void,
  loading: boolean,
};

/**
 * Sidebar for displaying items.
 */
class Sidebar extends React.Component<Props> {
  static defaultProps = {
    footer: true,
    header: true,
    loading: true,
  };

  props: Props;

  componentDidMount() {
    if (this.props.loading) {
      this.props.loadSidebar();
    }
  }

  renderContent() {
    let content = null;

    if (this.props.loading) {
      content = (
        <div className="SidebarSkeleton">
          <div className="SidebarSkeleton__item Skeleton" />
          <div className="SidebarSkeleton__item Skeleton" />
          <div className="SidebarSkeleton__item Skeleton" />
        </div>
      );
    } else if (this.props.children) {
      content = this.props.children;
    }

    return content;
  }

  render() {
    return (
      <section
        className={classNames('Sidebar', {
          'Sidebar--footer': this.props.footer,
          'Sidebar--header': this.props.header,
        })}
      >
        {this.renderContent()}
      </section>
    );
  }
}

export default Sidebar;
