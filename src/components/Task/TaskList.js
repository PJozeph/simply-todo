
import Task from "./Task"
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/authStore";
import { useDispatch } from "react-redux"

import { getAllTask } from "../../store/taskReducer";
import { useSelector } from "react-redux";


import 'bootstrap/dist/css/bootstrap.min.css';

import Style from "styled-components";

const Container = Style.div`
    width : 100%;

    @media (min-width: 350px) {
        width: 350px;
      }
`

const TaskList = (props) => {

    const context = useContext(AuthContext);
    const [tasks] = useState([]);
    const dispatch = useDispatch();

    const token = context.token;
    const userId = context.userId;
    const tasksList = useSelector(state => state.todo.tasks)

    useEffect(() => {
        dispatch(getAllTask({ token, userId }))
    }, [tasks])

    let filterFunk = (task => task.isCompleted === false);

    if (props.isCompleted) {
        filterFunk = (task => task.isCompleted === true);
    }

    return (
        <Container>
                {tasksList.filter(filterFunk).map((task) => {
                    return <Task key={task.id}
                        text={task.text}
                        isCompleted={task.isCompleted}
                        taskId={task.id} />
                })}
        </Container>
    )
}

export default TaskList;