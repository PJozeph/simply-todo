import Style from "styled-components";
import React, { useEffect } from 'react';

import { Route, Switch } from "react-router-dom";
import TaskList from "./components/Task/TaskList";
import Login from "./components/Pages/Auth";
import Layout from "./components/Pages/Layout";
import Input from "./components/Task/Input"

import { useDispatch } from "react-redux";
import { authActions } from "./store/authReducer"

import classes from "./App.module.css"

const Container = Style.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 2%;
`

const getToken = () => {
  const storedToken = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");
  const remainingTime = calculatingRemainingTime(expirationTime);
  if (remainingTime <= 0) {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationTime")
    return null;
  }
  return remainingTime
}

const calculatingRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustExpirationTime = new Date(expirationTime).getTime();
  return adjustExpirationTime - currentTime;
}

const App = () => {

  const remainingTokenTime = getToken();
  
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(authActions.logout());
  }, remainingTokenTime)

  return (
    <Layout>
      <Container>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/completed" >
            <Input />
            <TaskList isCompleted />
          </Route>
          <Route path="/"  >
            <Input />
            <TaskList />
          </Route>
        </Switch>
      </Container>
    </Layout>
  );
}


export default App;
