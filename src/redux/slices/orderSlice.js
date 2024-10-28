import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    order: [],
    loading: false,
    error:null,
};

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        fetchOrderRequest:(state)=>{
            state.loading = true
        },
        fetchOrderSuccess:(state,action)=>{
            state.order= action.payload;
            state.loading=false
        },
        fetchOrderFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchPaymentRequest:(state)=>{
            state.loading = true
        },
        fetchPaymentSuccess:(state,action)=>{
            state.order= action.payload;
            state.loading=false
        },
        fetchPaymentFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchOrderByUserRequest:(state)=>{
            state.loading = true
        },
        fetchOrderByUserSuccess:(state,action)=>{
            state.order= action.payload;
            state.loading=false
        },
        fetchOrderByUserFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchOrderForPickupRequest:(state)=>{
            state.loading = true
        },
        fetchOrderForPickupSuccess:(state,action)=>{
            state.order= action.payload;
            state.loading=false
        },
        fetchOrderForPickupFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchDriverOrderRequest:(state)=>{
            state.loading = true
        },
        fetchDriverOrderSuccess:(state,action)=>{
            state.order= action.payload;
            state.loading=false
        },
        fetchDriverOrderFailure:(state,action)=>{
            state.error = action.payload
        },
        createOrderRequest:(state)=>{
            state.loading=true
        },
        createOrderSuccess:(state,action)=>{
            state.order.push(action.payload)
            state.loading=false
        },
        createOrderFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
    
        fetchOrderByIdRequest:(state)=>{
            state.loading = true
        },
        fetchOrderByIdSuccess:(state,action)=>{
            state.order= action.payload;
            state.loading=false
        },
        fetchOrderByIdFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchOrderPaymentByIdRequest:(state)=>{
            state.loading = true
        },
        fetchOrderPaymentByIdSuccess:(state,action)=>{
            state.order= action.payload;
            state.loading=false
        },
        fetchOrderPaymentByIdFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchOrderPaymentRequest:(state)=>{
            state.loading = true
        },
        fetchOrderPaymentSuccess:(state,action)=>{
            state.order= action.payload;
            state.loading=false
        },
        fetchOrderPaymentFailure:(state,action)=>{
            state.error = action.payload
        },
    //     // In orderSlice.js
    //     updateOrderStatus:(state, action) => {
    //     const { orderId, status } = action.payload;
    //     if (state.order && state.order._id === orderId) {
    //     state.order.status = status;
    // }
// }

    }
})

export const {
    fetchOrderRequest,
    fetchOrderSuccess,
    fetchOrderFailure,
    fetchPaymentRequest,
    fetchPaymentSuccess,
    fetchPaymentFailure,
    fetchOrderPaymentRequest,
    fetchOrderPaymentSuccess,
    fetchOrderPaymentFailure,
    fetchOrderByUserRequest,
    fetchOrderByUserSuccess,
    fetchOrderByUserFailure,
    fetchOrderForPickupRequest,
    fetchOrderForPickupSuccess,
    fetchOrderForPickupFailure,
    fetchDriverOrderRequest,
    fetchDriverOrderSuccess,
    fetchDriverOrderFailure,
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure,
    fetchOrderByIdRequest,
    fetchOrderByIdSuccess,
    fetchOrderByIdFailure,
    fetchOrderPaymentByIdRequest,
    fetchOrderPaymentByIdSuccess,
    fetchOrderPaymentByIdFailure,
    updateOrderStatus
} = orderSlice.actions

export default orderSlice.reducer