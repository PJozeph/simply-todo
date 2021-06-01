
import Task from "./Task"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"

import { getAllTask } from "../../store/taskReducer";
import { useSelector } from "react-redux";

const TaskList = () => {

    const [tasks] = useState([]);
    const dispatch = useDispatch();

    const tasksList = useSelector(state => state.todo.tasks)

    useEffect(() => {
        dispatch(getAllTask())
    }, [tasks])

    return (
        <div>
            <ul>
                {tasksList.filter(task => task.isCompleted === false).map((task) => {
                    return <Task key={task.id}
                        text={task.text}
                        isCompleted={task.isCompleted}
                        taskId={task.id} />
                })}
            </ul>
        </div>
    )
}

export default TaskList;