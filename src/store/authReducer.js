import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from "axios"

const initialState = { 
    token : '',
    isLoggedin : false,
    email: '',
    userId: ''
 };

 export const login = createAsyncThunk(
     'auth/login',
     async ({url ,email, password}, thunkAPI) => {
        const result = await axios.post(url,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(response => {
                const expirationTime = new Date(new Date().getTime() + (+response.data.expiresIn * 1000));
                const token = response.data.idToken;
                const  userId = response.data.localId;
                localStorage.setItem("expirationTime", expirationTime);
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
                return response.data;
            });
            return result;
        }
     );

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers : {
        logout : (state, action) => {
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            localStorage.removeItem("expirationTime");
            state.isLoggedin = false;
            state.token = '';
            state.userId = '';
        }
    },
    extraReducers: {
        [login.fulfilled] : (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.localId;
            state.isLoggedin = true;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;