import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    drivers: [],
    loading: false,
    error:null,
};

const driverSlice = createSlice({
    name:'drivers',
    initialState,
    reducers:{
        fetchDriverRequest:(state)=>{
            state.loading = true
        },
        fetchDriverSuccess:(state,action)=>{
            state.drivers= action.payload;
            state.loading=false
        },
        fetchDriverFailure:(state,action)=>{
            state.error = action.payload
        },
        createDriverRequest:(state)=>{
            state.loading=true
        },
        createDriverSuccess:(state,action)=>{
            state.drivers.push(action.payload)
            state.loading=false
        },
        createDriverFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {fetchDriverRequest,fetchDriverSuccess,fetchDriverFailure,createDriverRequest,createDriverSuccess,createDriverFailure} = driverSlice.actions

export default driverSlice.reducer