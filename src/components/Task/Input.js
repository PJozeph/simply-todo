import { useState, useRef, useEffect } from "react";

import { useDispatch } from "react-redux";
import { addNewTask } from "../../store/taskReducer"
import {useSelector} from "react-redux";

import React from "react";

import Style from "styled-components";

const Container = Style.div`
`

const Input = () => {

    const [enteredTask, setEnteredTask] = useState('');
    const [isInputEmpty, seIsInputIsEmpty] = useState(true);

    const authState = useSelector(state => state.auth)

    const enteredTaskInput = useRef('');

    const dispatch = useDispatch();


    const isLoggedId = authState.isLoggedIn;
    const userId = authState.userId;

    useEffect(() => {
        enteredTask.length === 0 ? seIsInputIsEmpty(true) : seIsInputIsEmpty(false);
    }, [enteredTask])


    const taskChangeHandler = (event) => {
        setEnteredTask(event.target.value);
    }

    const addTaskHandler = () => {
        dispatch(addNewTask({text: enteredTask, isCompleted: false, userId}));
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

    let signInMessage = null;
    if(!isLoggedId) {
        signInMessage = (<div className="alert alert-info" role="alert">
                             Signin to create your own tasks!
                        </div>)
    }

    return (
        <Container>
            {signInMessage}
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