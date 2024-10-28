import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    notification: '',
    loading: false,
    error:null,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        fetchNotificationRequest: (state) => {
            state.loading = true
        },
        fetchNotificationSuccess:(state,action)=>{
            state.notification = action.payload;
            state.loading = false;
        },
        fetchNotificationFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        createAdminRequest:(state)=>{
            state.loading = true
        },
        createAdminSuccess: (state,action) =>{
            state.admin.push(action.payload)
            state.loading = false
        },
        createAdminFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})

export const {
    fetchNNotificationRequest,
    fetchNotificationSuccess,
    fetchNotificationFailure,
    createAdminRequest,
    createAdminSuccess,
    createAdminFailure
} = notificationSlice.actions;

export default notificationSlice.reducer