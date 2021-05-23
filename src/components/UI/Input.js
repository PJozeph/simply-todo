import Style from "styled-components";
import { useState, useRef, useEffect } from "react";

import { useDispatch } from "react-redux";
import { todoActions } from "../../store/todoReducer"

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
        dispatch(todoActions.addItem(enteredTask));
        setEnteredTask('')
    }

    const cancelEventHandler = () => {
        setEnteredTask("")
    }

    let controlPanel = null;
    if (!isInputEmpty) {
        controlPanel = (<div style={{ marginRight: 'auto', order: '2', padding: '5px' }} >
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
            {controlPanel}
        </Container>)
}

export default Input;