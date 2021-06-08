import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Style from "styled-components";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import store from "./store/index";

const Main = (
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
)

ReactDOM.render(Main, document.getElementById('root'));

