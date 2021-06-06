import Style from "styled-components";
import React from 'react';

import { Route, Switch } from "react-router-dom";
import TaskList from "./components/Task/TaskList";
import Login from "./components/Pages/Auth";
import Layout from "./components/Pages/Layout";
import Input from "./components/Task/Input"

import classes from "./App.module.css"

const Container = Style.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 2%;
`
const App = () => {
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
