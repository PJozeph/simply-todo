import Style from "styled-components";
import { useState, useRef, useEffect } from "react";

import { useDispatch } from "react-redux";
import { addNewTask } from "../../store/taskReducer"

const Container = Style.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    width: 500px;
`
const Input = () => {

    const [enteredTask, setEnteredTask] = useState('');
    const [isInputEmpty, seIsInputIsEmpty] = useState(false);

    const enteredTaskInput = useRef('');

    const dispatch = useDispatch();

    useEffect(() => {
        enteredTask.length === 0 ? seIsInputIsEmpty(true) : seIsInputIsEmpty(false);
    }, [enteredTask])


    const taskChangeHandler = (event) => {
        setEnteredTask(event.target.value);
    }

    const addTaskHandler = () => {
        dispatch(addNewTask({text: enteredTask, isCompleted: false}));
        setEnteredTask('')
    }

    const cancelEventHandler = () => {
        setEnteredTask("")
    }

    let buttons = (<div style={{height:'60px'}}></div>);
    if (!isInputEmpty) {
        buttons = (<div style={{ marginRight: 'auto', order: '2', padding: '5px' }} >
            <button style={{ width: "100px", margin: '5px' }}
                className="btn btn-outline-primary"
                disabled={isInputEmpty}
                onClick={addTaskHandler}> Add task
        </button>
            <button style={{ width: "100px" }}
                className="btn btn-outline-danger"
                disabled={isInputEmpty}
                onClick={cancelEventHandler}>Cancel
        </button>
        </div>);
    }

    return (
        <Container>
            <div className="input-group" style={{ padding: '7px' }}>
                <div className="input-group-prepend">
                    <span className="input-group-text">Create new task</span>
                </div>
                <input type="any"
                    className="form-control"
                    placeholder="Learn react"
                    onChange={taskChangeHandler}
                    value={enteredTask}
                    ref={enteredTaskInput} />
            </div>
            {buttons}
        </Container>)
}

export default Input;