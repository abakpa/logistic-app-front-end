import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
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
    fetchDriverOrderSuccess,
    fetchDriverOrderFailure,
    fetchDriverOrderRequest,
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure,
    fetchOrderByIdRequest,
    fetchOrderByIdSuccess,
    fetchOrderByIdFailure,
    fetchOrderPaymentByIdRequest,
    fetchOrderPaymentByIdSuccess,
    fetchOrderPaymentByIdFailure
} from '../slices/orderSlice'

 function* fetchOrderSaga(){
    try {
    
        const response = yield call(axios.get, 'http://localhost:4000/api/orders')
        yield put(fetchOrderSuccess(response.data))
    } catch (error) {
        yield put(fetchOrderFailure(error.response.data.message))
    }
}
 function* fetchOrderByUserSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.get, 'http://localhost:4000/api/orders/user',config)
        yield put(fetchOrderByUserSuccess(response.data))
    } catch (error) {
        yield put(fetchOrderByUserFailure(error.response.data.message))
    }
}
 function* fetchDriverOrderSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.get, 'http://localhost:4000/api/orders/orderbydriver',config)
        yield put(fetchDriverOrderSuccess(response.data))
    } catch (error) {
        yield put(fetchDriverOrderFailure(error.response.data.message))
    }
}
 function* fetchOrderForPickupSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.get, 'http://localhost:4000/api/orders/orderforpickup',config)
        yield put(fetchOrderForPickupSuccess(response.data))
    } catch (error) {
        yield put(fetchOrderForPickupFailure(error.response.data.message))
    }
}
function* createOrderSaga(action){
    const {details,navigate} = action.payload
    try {
      
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,'http://localhost:4000/api/orders', details,config);
        console.log('new order',response.data)
        yield put(createOrderSuccess(response.data))
        navigate(`/paymentfororder/${response.data._id}`)
    } catch (error) {
        yield put(createOrderFailure(error.response.data.message))
    }
}
function* fetchOrderByIdSaga(action){
    const {orderId,navigate} = action.payload
   try {
       const token = localStorage.getItem('authToken');
       const config = {
           headers: {
               Authorization: `Bearer ${token}`
           }
       }
       const response = yield call(axios.get, `http://localhost:4000/api/orders/${orderId}`,{},config)
       yield put(fetchOrderByIdSuccess(response.data))
       navigate(`/usersingleorder/${orderId}`)
   } catch (error) {
       yield put(fetchOrderByIdFailure(error.response.data.message))
   }
}
function* fetchOrderPaymentByIdSaga(action){
    const {id} = action.payload
   try {
       const token = localStorage.getItem('authToken');
       const config = {
           headers: {
               Authorization: `Bearer ${token}`
           }
       }
       const response = yield call(axios.get, `http://localhost:4000/api/orders/${id}`,{},config)
       yield put(fetchOrderPaymentByIdSuccess(response.data))
    //    navigate(`/usersingleorder/${orderId}`)
   } catch (error) {
       yield put(fetchOrderPaymentByIdFailure(error.response.data.message))
   }
}
function* fetchOrderPaymentSaga(action){
    const {orderId} = action.payload
   try {
       const token = localStorage.getItem('authToken');
       const config = {
           headers: {
               Authorization: `Bearer ${token}`
           }
       }
       const response = yield call(axios.get, `http://localhost:4000/api/orders/${orderId}`,{},config)
       yield put(fetchOrderPaymentSuccess(response.data))
   } catch (error) {
       yield put(fetchOrderPaymentFailure(error.response.data.message))
   }
}
function* fetchPaymentSaga(action){
    const {reference,id,navigate} = action.payload
    console.log('ref saga',reference, id)
   try {
       const response = yield call(axios.get, `http://localhost:4000/api/payment/${reference}?id=${id}`);
       console.log('ref saga 2',response.data)
       if(response.data.data.status==='success'){
       navigate(`/receipt/${id}`)
       }
       yield put(fetchPaymentSuccess(response.data))
   } catch (error) {
       yield put(fetchPaymentFailure(error.response.data.message))
   }
}
function* orderSaga(){
    yield takeLatest(fetchOrderRequest.type, fetchOrderSaga)
    yield takeLatest(fetchPaymentRequest.type, fetchPaymentSaga)
    yield takeLatest(fetchOrderPaymentRequest.type, fetchOrderPaymentSaga)
    yield takeLatest(fetchDriverOrderRequest.type, fetchDriverOrderSaga)
    yield takeLatest(fetchOrderForPickupRequest.type, fetchOrderForPickupSaga)
    yield takeLatest(fetchOrderByUserRequest.type, fetchOrderByUserSaga)
    yield takeLatest(createOrderRequest.type, createOrderSaga)
    yield takeLatest(fetchOrderByIdRequest.type, fetchOrderByIdSaga)
    yield takeLatest(fetchOrderPaymentByIdRequest.type, fetchOrderPaymentByIdSaga)
}

export default orderSaga