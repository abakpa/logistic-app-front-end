import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dispatches: [],
    loading: false,
    error:null,
};

const dispatchSlice = createSlice({
    name:'dispatch',
    initialState,
    reducers:{
        fetchDispatchRequest:(state)=>{
            state.loading = true
        },
        fetchDispatchSuccess:(state,action)=>{
            state.dispatches= action.payload;
            state.loading=false
        },
        fetchDispatchFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchDispatchByOrderIdRequest:(state)=>{
            state.loading = true
        },
        fetchDispatchByOrderIdSuccess:(state,action)=>{
            state.dispatches= action.payload;
            state.loading=false
        },
        fetchDispatchByOrderIdFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchDispatchByDriverRequest:(state)=>{
            state.loading = true
        },
        fetchDispatchByDriverSuccess:(state,action)=>{
            state.dispatches= action.payload;
            state.loading=false
        },
        fetchDispatchByDriverFailure:(state,action)=>{
            state.error = action.payload
        },
        createDispatchRequest:(state)=>{
            state.loading=true
        },
        createDispatchSuccess:(state,action)=>{
            state.dispatches.push(action.payload)
            state.loading=false
        },
        createDispatchFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createDispatchByDriverRequest:(state)=>{
            state.loading=true
        },
        createDispatchByDriverSuccess:(state,action)=>{
            state.dispatches.push(action.payload)
            state.loading=false
        },
        createDispatchByDriverFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {
    fetchDispatchRequest,
    fetchDispatchSuccess,
    fetchDispatchFailure,
    fetchDispatchByOrderIdRequest,
    fetchDispatchByOrderIdSuccess,
    fetchDispatchByOrderIdFailure,
    fetchDispatchByDriverRequest,
    fetchDispatchByDriverSuccess,
    fetchDispatchByDriverFailure,
    createDispatchByDriverRequest,
    createDispatchByDriverSuccess,
    createDispatchByDriverFailure,
    createDispatchRequest,
    createDispatchSuccess,
    createDispatchFailure
} = dispatchSlice.actions

export default dispatchSlice.reducer