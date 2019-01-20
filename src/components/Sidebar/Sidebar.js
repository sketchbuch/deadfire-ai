// @flow

import * as React from 'react';
import classNames from 'classnames';
import type { Domains } from '../../types/domains';
import * as sidebarActions from '../../actions/sidebarActions';
import './Sidebar.css';

type Props = {
  children?: React.Node,
  dispatch: Function,
  domain: Domains,
  footer: boolean,
  header: boolean,
  itemCount: number,
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
    if (this.props.loading || (!this.props.loading && this.props.itemCount < 1)) {
      this.props.dispatch(sidebarActions.loading(this.props.domain));
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
