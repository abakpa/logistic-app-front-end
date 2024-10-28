import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    users: [],
    loading: false,
    error:null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        fetchUsersRequest: (state) => {
            state.loading = true
        },
        fetchUsersSuccess:(state,action)=>{
            state.users = action.payload;
            state.loading = false;
        },
        fetchUsersFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        createUserRequest:(state)=>{
            state.loading = true
        },
        createUserSuccess: (state,action) =>{
            state.users.push(action.payload)
            state.loading = false
        },
        createUserFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {fetchUsersRequest,fetchUsersSuccess,fetchUsersFailure,createUserRequest,createUserSuccess,createUserFailure} = userSlice.actions;

export default userSlice.reducer