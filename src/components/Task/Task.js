import Style from "styled-components";
import { useDispatch } from "react-redux";
import { markTaskCompleted } from "../../store/taskReducer"

import { useContext } from "react";
import AuthContext from "../../store/authStore";

const Container = Style.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Task = (props) => {

    const dispatch = useDispatch();
    const context = useContext(AuthContext);
    const userId = context.userId;

    const taskChangeHandler = (taskId, text, isCompleted) => {
        dispatch(markTaskCompleted({ id: taskId, text, isCompleted, userId }))
    }

    return (
            <div className="card"  style={{margin:'8px'}}>
                <div className="card-body">
                    {props.text}
                    <input className="form-check-input" onFocus='active'
                        type="checkbox"
                        checked={props.isCompleted}
                        onChange={() => taskChangeHandler(props.taskId, props.text, !props.isCompleted)}
                        style={{ float: 'right' }} />
                </div>
            </div>
    )
}

export default Task;