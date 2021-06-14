import Task from "./Task"
import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux"

import { getAllTask } from "../../store/taskReducer";
import { useSelector } from "react-redux";

import Style from "styled-components";

const Container = Style.div`
    width : 100%;
    height:400px;
    overflow-y: auto;

    @media (min-width: 350px) {
        width: 350px;
      }
`

const TaskList = (props) => {

    const authState = useSelector(state => state.auth);
    const [tasks] = useState([]);
    const dispatch = useDispatch();

    const token = authState.token;
    const userId = authState.userId;
    const tasksList = useSelector(state => state.todo.tasks)

    useEffect(() => {
        dispatch(getAllTask({ token, userId }))
    }, [])

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