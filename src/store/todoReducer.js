import {createAsyncThunk ,createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [
        { id: '0', text: 'buy milk', isCompleted: false },
        { id: '1', text: 'learn react', isCompleted: false },
        { id: '2', text: 'meet Fanni ', isCompleted: false }],
};


const todoSlice = createSlice({
    name: 'todoReducer',
    initialState,
    reducers: {
        addItem(state, action) {
            state.tasks.push({ id: Math.random().toString(), text: action.payload })
        },
        removeItem(state, action) {
            const tasks = state.tasks.filter( task => task.id !== action.payload);
            state.tasks = tasks;
        },
        markItemCompleted(state, action) {

        }
    } 
})

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;