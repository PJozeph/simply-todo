import { createSlice } from '@reduxjs/toolkit';

import axios from "axios"

const initialState = {
    tasks: [
        { id: '0', text: 'buy milk', isCompleted: false },
        { id: '1', text: 'learn react', isCompleted: false },
        { id: '2', text: 'meet Fanni ', isCompleted: false }],
};

export const sendTask = (task) => async (dispatch) => {
    await axios.post('https://simply-todo-fd648-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', {
        text: task,
        isCompleted: false
    })
        .then(response => { console.log(response.data) })
}

const todoSlice = createSlice({
    name: 'todoReducer',
    initialState,
    reducers: {
        addItem(state, action) {
            state.tasks.push({ id: Math.random().toString(), text: action.payload, isCompleted: false })
        },
        removeItem(state, action) {
            const tasks = state.tasks.filter(task => task.id !== action.payload);
            state.tasks = tasks;
        },
        markItemCompleted(state, action) {
            const itemIndex = state.tasks.findIndex(item => item.id === action.payload);
            state.tasks[itemIndex].isCompleted = true;
        },
    }
})

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;