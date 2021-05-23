import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks : [],
};

const todoSlice = createSlice({
    name: 'todoReducer',
    initialState,
    reducers: {
        addItem(state, action) {
            state.tasks.push(action.payload)
        }
    }
})

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;