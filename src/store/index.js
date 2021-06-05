
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './taskReducer'

const store = configureStore({
  reducer: {
    todo: taskReducer,
  },
});

export default store;