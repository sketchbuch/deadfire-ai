import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ErrorLayout from '../../layouts/Error/ErrorLayout';
import HomeLayout from '../../layouts/Home/HomeLayout';
import NotFoundLayout from '../../layouts/NotFound/NotFoundLayout';
import Header from '../../components/Header/Header';
import { getCustomNumProp } from '../../utils/dom';
import * as appActions from '../../actions/appActions';
import type { AppType } from '../../types/app';
import type { DispatchType } from '../../types/functions';
import {
  ROUTE_ERROR,
  ROUTE_HOME,
} from '../../constants/routes';
import './App.css';

type Props = {
  app: AppType,
  appErrored: (hideLoader: ()=>{}) => {},
  appLoading: (hideLoader: ()=>{}) => {},
};

function hideLoader() {
  const alDuration = getCustomNumProp('--apploader-ms');
  document.getElementsByTagName('html')[0].classList.add('app-initialised');

  setTimeout(
    () => {
      let appLoaderEle = document && document.getElementById('apploader');
      if (appLoaderEle && appLoaderEle.parentNode) appLoaderEle.parentNode.removeChild(appLoaderEle);
    },
    alDuration,
  );
}

export class App extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.appLoading(hideLoader);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="App__content">
            <Switch>
              <Route exact={true} path={ROUTE_HOME} component={HomeLayout} />
              <Route path={ROUTE_ERROR} component={ErrorLayout} />
              <Route component={NotFoundLayout} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state: Object) => (
  { app: state.app }
);

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    appErrored: (hideLoader: ()=>{}) => {
      dispatch(appActions.errored(hideLoader))
    },
    appLoading: (hideLoader: ()=>{}) => {
      dispatch(appActions.loading(hideLoader))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
