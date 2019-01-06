// @flow

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';
import AppPresenter from './AppPresenter';
import type { Dispatch as ReduxDispatch } from 'redux';

type Props = {
  appLoading: () => void,
  error: boolean,
  errorMsg: string,
  installPathSet: boolean,
  loaded: boolean,
  storageCreated: boolean,
};

export class App extends Component<Props> {
  props: Props;

  static defaultProps = {
    error: false,
    errorMsg: '',
    loaded: false,
    storageCreated: false,
  };

  componentDidMount() {
    this.props.appLoading();
  }

  render() {
    const {
      error,
      errorMsg,
      installPathSet,
      loaded,
      storageCreated,
    } = this.props;

    return (
      <BrowserRouter>
        <AppPresenter
          error={error}
          errorMsg={errorMsg}
          installPathSet={installPathSet}
          storageCreated={storageCreated}
          loaded={loaded}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  error: state.app.error,
  errorMsg: state.app.errorMsg,
  installPathSet: state.app.installPathSet,
  loaded: state.app.loaded,
  storageCreated: state.app.storageCreated,
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => {
  return {
    appLoading: () => {
      dispatch(appActions.loading());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
