// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';
import type { DispatchType } from '../../types/functions';
import AppPresenter from './AppPresenter';

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
    const { error,  errorMsg, installPathSet, loaded, storageCreated } = this.props;

    return <AppPresenter
      error={error}
      errorMsg={errorMsg}
      installPathSet={installPathSet}
      storageCreated={storageCreated}
      loaded={loaded}
    />;
  }
}

const mapStateToProps = (state: Object) => (
  {
    error: state.app.error,
    errorMsg: state.app.errorMsg,
    installPathSet: state.app.installPathSet,
    loaded: state.app.loaded,
    storageCreated: state.app.storageCreated,
  }
);

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    appLoading: () => {
      dispatch(appActions.loading())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
