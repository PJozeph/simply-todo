
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './taskReducer'
import authReducer from './authReducer';

const store = configureStore({
  reducer: {
    todo: taskReducer,
    auth: authReducer
  },
});

export default store;