import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from "axios"

const initialState = { 
    token : '',
    isloggedin : false,
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
            .then(res => {
                const expirationTime = new Date(new Date().getTime() + (+res.data.expiresIn * 1000));
                const token = res.data.idToken;
                const  userId = res.data.localId;
                localStorage.setItem("expirationTime", expirationTime);
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
                return res;
            });
            return result;
        }
     );

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    extraReducers: {
        [login.fulfilled] : (state, action) => {
            state.token = action.payload.data.token;
            state.userId = action.payload.data.localId;
            state.isloggedin = true;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;