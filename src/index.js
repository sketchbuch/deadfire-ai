import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';
import store from './store/redux';
import './index.css';
import App from './components/App/App';
import { TOASTR_DURATION } from './constants/misc';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="App__frame">
        <App />
        <ReduxToastr
          timeOut={TOASTR_DURATION}
          newestOnTop={false}
          preventDuplicates
          position="bottom-center"
          transitionIn="bounceIn"
          transitionOut="fadeOut"
        />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
