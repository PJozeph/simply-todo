
import Task from "./Task"

const TaskList = (props) => {
    return (
        <div>
            <ul>
                {props.tasks.map((task) => {
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