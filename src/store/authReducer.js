import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from "axios"

 export const signUp = createAsyncThunk(
     'auth/signUp',
     async user => {
         console.log(user)
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSg1JotvDnX0S3_o1ZgkmtN_SAu0sNuM0',
            { ...user, returnSecureToken : true})
            .then(response => { return response.data });
        return response;
    }
 )

 export const signIn = createAsyncThunk(
    'auth/signIn',
    async user => {
        console.log(user)
       const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSg1JotvDnX0S3_o1ZgkmtN_SAu0sNuM0',
           { ...user, returnSecureToken : true})
           .then(response => {
               return response.data 
            })
           .catch(error => {
               throw new Error(error.response.data.error.message)
           });
       return response;
   }
)

 const initialState = { 
    isLoggedIn : false,
    token : null,
    expirationTime: null,
    error: null
 };

const authSlice = createSlice({
    name :'authReducer',
    initialState,
    extraReducers : {
        [signUp.fulfilled] : (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        [signIn.fulfilled] : (state, action) => {
            state.isLoggedIn = true
        },
        [signIn.rejected] : (state, action) => {
            state.error = action.error.message
        },
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;