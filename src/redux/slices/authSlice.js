import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user:null,
    token:null,
    error:null,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginRequest:(state)=>{
            state.error = null
        },
        loginSuccess:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        loginFailure:(state,action)=>{
            state.error = action.payload
        },
        logoutRequest:(state)=>{
            state.error = null
        },
        logoutSuccess:(state,action)=>{
            state.user = "";
            state.token = ""
        },
        logoutFailure:(state,action)=>{
            state.error = action.payload
        }
    }
})

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure
} = authSlice.actions

export default authSlice.reducer