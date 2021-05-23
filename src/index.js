import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from "react-redux";
import store from "./store/index"

const Main = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(Main, document.getElementById('root'));

