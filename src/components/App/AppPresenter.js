// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NewLayout from '../../layouts/New/NewLayout';
import ErrorLayout from '../../layouts/Error/ErrorLayout';
import HomeLayout from '../../layouts/Home/HomeLayout';
import NotFoundLayout from '../../layouts/NotFound/NotFoundLayout';
import Header from '../../components/Header/Header';
import { ROUTE_HOME } from '../../constants/routes';
import './AppPresenter.css';

type Props = {
  error: boolean,
  errorMsg: string,
  installPathSet: boolean,
  loaded: boolean,
  storageCreated: boolean,
};

export class AppPresenter extends Component<Props> {
  props: Props;
  
  static defaultProps = {
    errorMsg: '',
  };

  render() {
    const { error,  errorMsg, installPathSet, loaded, storageCreated } = this.props;
    let content = null;
  
    if (loaded) {
      if (error) {
        content = <ErrorLayout errorMsg={errorMsg} />
      } else if (storageCreated && !installPathSet) {
        content = <NewLayout />
      } else {
        content = (
          <Switch>
            <Route exact={true} path={ROUTE_HOME} component={HomeLayout} />
            <Route component={NotFoundLayout} />
          </Switch>
        );
      }
    } // Else, loader is showing.
  
    return (
      <div className="App">
        <Header />
        <div className="App__content">
          {content}
        </div>
      </div>
    )
  }
}


export default AppPresenter;
