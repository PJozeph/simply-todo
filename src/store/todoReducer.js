import { createSlice, create, createAsyncThunk } from '@reduxjs/toolkit';

import axios from "axios"

const initialState = {
    tasks: [
        { id: '0', text: 'buy milk', isCompleted: false },
        { id: '1', text: 'learn react', isCompleted: false },
        { id: '2', text: 'meet Fanni ', isCompleted: false }],
};

export const addNewTask = createAsyncThunk(
    'task/addNewTask',
    async task => {
      const response = await axios.post('https://simply-todo-fd648-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      { ...task }
      ).then(response => { return {...task, id: response.data['name']}
        })
      return response
    }
  )

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
    },
    extraReducers : {
        [addNewTask.fulfilled] : (state, action) => {
            console.log(action.payload)
            state.tasks.push(action.payload);
        }
    }
})

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;