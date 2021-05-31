import Input from "./components/UI/Input"

import Style from "styled-components";
import React from 'react';

import { useSelector } from "react-redux";

import TaskList from "./components/Task/TaskList";
import Header from "./components/UI/Header/Header"
const Container = Style.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const App = () => {

  const tasks = useSelector(state => state.todo.tasks)

  return (
    <React.Fragment>
      <Header />
      <Container>
        <Input />
        <TaskList tasks={tasks} />
      </Container>
    </React.Fragment>
  );
}

export default App;
