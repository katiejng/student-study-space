import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from "redux-thunk";
import reducers from './reducers';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { config } from './config'
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));



firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <App
      auth={firebase.auth}
      database={firebase.database()}
    />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
