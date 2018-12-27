// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeLayout from '../../layouts/Home/HomeLayout';
import NewLayout from '../../layouts/New/NewLayout';
import ErrorLayout from '../../layouts/Error/ErrorLayout';
import NotFoundLayout from '../../layouts/NotFound/NotFoundLayout';
import Header from '../../components/Header/Header';
import {
  ROUTE_HOME,
  ROUTE_NEW,
  ROUTE_ERROR,
} from '../../constants/routes';
import './AppPresenter.css';

type Props = {
  errorMsg: string
};

export class AppPresenter extends Component<Props> {
  props: Props;
  
  static defaultProps = {
    errorMsg: '',
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App__content">
          <Switch>
            <Route exact={true} path={ROUTE_ERROR} render={
              (props) => <ErrorLayout {...props} errorMsg={this.props.errorMsg} />
            }/>
            <Route exact={true} path={ROUTE_NEW} component={NewLayout} />
            <Route exact={true} path={ROUTE_HOME} component={HomeLayout} />
            <Route component={NotFoundLayout} />
          </Switch>
        </div>
      </div>
    )
  }
}


export default AppPresenter;
