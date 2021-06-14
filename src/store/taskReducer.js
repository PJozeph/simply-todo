import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from "axios"

const initialState = { tasks: [] };

export const addNewTask = createAsyncThunk(
    'task/addNewTask',
    async (task) => {
        const response = await axios.post('https://simply-todo-fd648-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
            { ...task }
        ).then(response => { return { ...task, id: response.data['name'] } });
        return response
    }
)

export const markTaskCompleted = createAsyncThunk(
    'task/markCompleted',
    async (task) => {
        const response = await axios.put(`${process.env.REACT_APP_DB_URL}` + `/tasks/` + task.id + `/.json`,
            { ...task})
            .then(response => {
                return {
                    id: response.data['id'],
                    text: response.data['text'], 
                    isCompleted: response.data['isCompleted']
                }
            });
        return response;
    }
)

export const getAllTask = createAsyncThunk(
    'task/getAllTask',
    async (obj) => {
        const response = await axios.get(`${process.env.REACT_APP_DB_URL}` + `/tasks.json?orderBy="userId"&equalTo="`+ obj.userId +`"`)
            .then(response => {
                const result = []
                for (const key in response.data) {
                    result.push({
                        id: key,
                        text: response.data[key].text,
                        isCompleted: response.data[key].isCompleted
                    })
                }
                return result;
            });
        return response;
    }
)

const todoSlice = createSlice({
    name: 'todoReducer',
    initialState,
    reducers : {
        restoreTasks : (state, action) => {
            state.tasks = [];
        }
    },
    extraReducers: {
        [getAllTask.fulfilled]: (state, action) => {
            state.tasks = action.payload;
        },
        [addNewTask.fulfilled]: (state, action) => {
            state.tasks.push(action.payload);
        },
        [markTaskCompleted.fulfilled]: (state, action) => {
            state.tasks.push(action.payload);
        },
        [markTaskCompleted.pending]: (state, action) => {
            const tasks = state.tasks.filter(task => task.id !== action.meta.arg['id']);
            state.tasks = tasks;
        }
    }
})

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;