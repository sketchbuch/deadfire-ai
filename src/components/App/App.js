// @flow

import React, { Component } from 'react';
import type { Dispatch as ReduxDispatch } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';
import AppPresenter from './AppPresenter';

type Props = {
  appLoading: () => void,
  error: boolean,
  errorMsg: string,
  installPathSet: boolean,
  loaded: boolean,
  menuExpanded: boolean,
  storageCreated: boolean,
  toggleMenu: (expanded: boolean) => void,
};

export class App extends Component<Props> {
  props: Props;

  static defaultProps = {
    error: false,
    errorMsg: '',
    installPathSet: false,
    loaded: false,
    menuExpanded: false,
    storageCreated: false,
  };

  componentDidMount() {
    this.props.appLoading();
  }

  render() {
    const { error, errorMsg, installPathSet, loaded, menuExpanded, storageCreated, toggleMenu } = this.props;

    return (
      <BrowserRouter>
        <AppPresenter
          error={error}
          errorMsg={errorMsg}
          installPathSet={installPathSet}
          loaded={loaded}
          menuExpanded={menuExpanded}
          storageCreated={storageCreated}
          toggleMenu={toggleMenu}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  error: state.app.error,
  errorMsg: state.app.errorMsg,
  installPathSet: state.app.installPathSet,
  languages: state.languages,
  loaded: state.app.loaded,
  menuExpanded: state.app.menuExpanded,
  storageCreated: state.app.storageCreated,
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => {
  return {
    appLoading: () => {
      dispatch(appActions.loading());
    },
    toggleMenu: (expanded: boolean) => {
      if (expanded) {
        dispatch(appActions.contractMenu());
      } else {
        dispatch(appActions.expandMenu());
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
