import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
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
} from '../slices/dispatchSlice'
import { fetchNotificationSuccess } from '../slices/notification'
import { url } from './url'
import io from 'socket.io-client'
const socket = io.connect(url)

 function* fetchDispatchSaga(){
    try {
       
        const response = yield call(axios.get, `${url}/api/dispatch`)
        yield put(fetchDispatchSuccess(response.data))
    } catch (error) {
        yield put(fetchDispatchFailure(error.response.data.message))
    }
}
 function* fetchDispatchByOrderIdSaga(action){
    const {orderId} = action.payload

    try {
       
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.get,`${url}/api/dispatch/order/${orderId}`,{},config)
        yield put(fetchDispatchByOrderIdSuccess(response.data))
    } catch (error) {
        yield put(fetchDispatchByOrderIdFailure(error.response.data.message))
    }
}
function* fetchDispatchByDriverSaga(){
    // const {orderId,navigate} = action.payload
    // const {orderId} = action.payload
    try {
      
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.get,`${url}/api/dispatch/driver`,config);
        yield put(fetchDispatchByDriverSuccess(response.data))
        // navigate('/OrderByDriver')
    } catch (error) {
        yield put(fetchDispatchByDriverFailure(error.response.data.message))
    }
}
function* createDispatchByDriverSaga(action){
    // const {orderId,navigate} = action.payload
    const {orderId} = action.payload
    try {
      
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.put,`${url}/api/orders/dispatch/${orderId}`,{},config);
        yield put(createDispatchByDriverSuccess(response.data))
        // navigate('/OrderByDriver')
    } catch (error) {
        yield put(createDispatchByDriverFailure(error.response.data.message))
    }
}
function* createDispatchSaga(action) {
    const { orderId } = action.payload; // Destructure orderId from the payload
    try {
        const token = localStorage.getItem('authToken'); // Get auth token from localStorage
        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Set token in Authorization header
            }
        };
        const response = yield call(axios.put, `${url}/api/dispatch/status/${orderId}`, {}, config);

        if (response.data.updatedDispatch) {
        socket.emit('send_user_message', { message: response.data.updatedDispatch.status });

        yield put(createDispatchSuccess(response.data.updatedDispatch));

        yield put(fetchNotificationSuccess(response.data.message));
        }else{

           yield put(fetchNotificationSuccess(response.data.message)); // Dispatch notification success if no status

        }

      

    } catch (error) {
        yield put(createDispatchFailure(error.response?.data?.message || 'An error occurred'));
    }
}

function* dispatchSaga(){
    yield takeLatest(fetchDispatchRequest.type, fetchDispatchSaga)
    yield takeLatest(fetchDispatchByOrderIdRequest.type, fetchDispatchByOrderIdSaga)
    yield takeLatest(fetchDispatchByDriverRequest.type, fetchDispatchByDriverSaga)
    yield takeLatest(createDispatchRequest.type, createDispatchSaga)
    yield takeLatest(createDispatchByDriverRequest.type, createDispatchByDriverSaga)
}

export default dispatchSaga