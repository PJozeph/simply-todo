import Input from "./components/UI/Input"

import Style from "styled-components";
import React from 'react';

import { useSelector } from "react-redux";

const Container = Style.div`
    display: flex;
    flex-direction: column;
`
const App = () => {

  const tasks = useSelector(state => state.todo.tasks)

  return (
    <Container>
      <Input />
      {tasks.map( item => <div>{item}</div>)}
    </Container>
  );
}

export default App;
