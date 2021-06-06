import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Style from "styled-components";

import { AuthContextProvider } from "./store/authStore"

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import store from "./store/index";

const Container = Style.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const Main = (
  <Provider store={store}>
    <AuthContextProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </AuthContextProvider>
  </Provider>
)

ReactDOM.render(Main, document.getElementById('root'));

