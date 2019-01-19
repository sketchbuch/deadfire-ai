// @flow

import * as React from 'react';
import classNames from 'classnames';
import * as sidebarActions from '../../actions/sidebarActions';
import './Sidebar.css';

type Props = {
  children?: React.Node,
  footer: boolean,
  header: boolean,
  loading: boolean,
  dispatch: Function,
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
    this.props.dispatch(sidebarActions.loading());
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
