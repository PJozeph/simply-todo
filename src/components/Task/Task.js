
import Style from "styled-components";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/todoReducer"

const Container = Style.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Task = (props) => {

    const dispatch = useDispatch();

    const taskChangeHandler = (taskId) => {
        dispatch(todoActions.markItemCompleted(taskId))
    }

    return (
        <Container>
            <div className="card" style={{ width: '26rem', margin: '7px' }}>
                <div className="card-body">
                    {props.text}
                    <input className="form-check-input"
                        type="checkbox"
                        checked={props.isCompleted}
                        onChange={() => taskChangeHandler(props.taskId)}
                        style={{ float: 'right' }} />
                </div>
            </div>
        </Container>
    )
}

export default Task;