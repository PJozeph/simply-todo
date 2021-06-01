import Input from "./components/UI/Input"

import Style from "styled-components";
import React from 'react';

import { Route, Switch } from "react-router-dom";
import TaskList from "./components/Task/TaskList";
import Header from "./components/UI/Header/Header";
import Login from "./components/Pages/Login";

const Container = Style.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const App = () => {

  return (
    <React.Fragment>
      <Header />
      <Container>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            <Input />
            <TaskList />
          </Route>
        </Switch>
      </Container>
    </React.Fragment>
  );
}

export default App;
