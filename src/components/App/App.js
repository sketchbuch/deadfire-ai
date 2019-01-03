// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as appActions from '../../actions/appActions';
import type { DispatchType } from '../../types/functions';
import AppPresenter from './AppPresenter';
import {
  ROUTE_ERROR,
  ROUTE_NEW,
} from '../../constants/routes';

type Props = {
  appLoading: () => void,
  error: boolean,
  errorMsg: string,
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
    const { pathname } = window.location;
    const { error,  errorMsg, loaded, storageCreated } = this.props;
    let content = null;

    if (error && pathname !== ROUTE_ERROR) {
      content = <Redirect to={ROUTE_ERROR} />
    } else if (storageCreated && pathname !== ROUTE_NEW) {
      content = <Redirect to={ROUTE_NEW} />
    } else if (loaded) {
      content = <AppPresenter errorMsg={errorMsg} />;
    }

    return content
  }
}

const mapStateToProps = (state: Object) => (
  {
    error: state.app.error,
    errorMsg: state.app.errorMsg,
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
